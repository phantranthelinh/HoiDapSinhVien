import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../Url'
import { logOut } from './user'

export const listMessageFromLocalStorage = localStorage.getItem('listMessage')
  ? JSON.parse(localStorage.getItem('listMessage'))
  : []

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    error: false,
    listMessage: listMessageFromLocalStorage,
  },
  reducers: {
    Request: (state) => {
      state.loading = true
    },
    Fail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    Reset: (state) => {
      state.success = false
      state.error = false
      state.deleteMessageSuccess = false
      state.sendMessageSuccess = false
    },
    getListMessageSuccess: (state, action) => {
      state.loading = false
      state.listMessage = action.payload
    },
    deleteMessageSuccess: (state) => {
      state.deleteMessageSuccess = true
    },
    sendMessageSuccess: (state) => {
      state.sendMessageSuccess = true
    },
  },
})

export const getListMessage = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'message/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${URL}/api/messages/${userInfo._id}`, config)
    dispatch({ type: 'message/getListMessageSuccess', payload: data.listMessage })
    localStorage.setItem('listMessage', JSON.stringify(data.listMessage))
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'message/Fail',
      payload: message,
    })
  }
}

export const deleteMessage = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'message/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`${URL}/api/messages/${id}`, config)
    dispatch({ type: 'message/deleteMessageSuccess' })

    dispatch(getListMessage())
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'message/Fail',
      payload: message,
    })
  }
}

export const sendMessage = (question, toId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'message/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(`${URL}/api/messages/send`, { question, toId }, config)
    dispatch({ type: 'message/sendMessageSuccess' })
    dispatch(getListMessage())
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'message/Fail',
      payload: message,
    })
  }
}

export default messageSlice.reducer

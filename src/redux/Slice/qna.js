import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../Url'
import { logOut } from './user'

export const qnaSlice = createSlice({
  name: 'qna',
  initialState: {
    loading: false,
    success: false,
    error: false,
    data: [],
    qna: {},
  },
  reducers: {
    Request: (state) => {
      state.loading = true
      state.success = false
    },
    Fail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    Reset: (state) => {
      state.actionSuccess = false
      state.error = false
    },
    listQnAsSuccess: (state, action) => {
      state.success = true
      state.data = action.payload
      state.loading = false
    },
    addQnASuccess: (state) => {
      state.success = true
      state.loading = false
    },
    deleteQnASuccess: (state) => {
      state.success = true
      state.loading = false
    },
    editQnASuccess: (state, action) => {
      state.loading = false
      state.qna = action.payload
    },
    updateQnASuccess: (state, action) => {
      state.actionSuccess = true
      state.loading = false
      state.qna = action.payload
    },
  },
})

//LIST QNA

export const getListQnAs =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'qna/Request' })

      const config = {
        headers: {
          'Context-Type': 'application/json',
        },
      }

      const { data } = await axios.get(`${URL}/api/qnas/all?page=${page}`, config)
      dispatch({ type: 'qna/listQnAsSuccess', payload: data })
      dispatch({ type: 'qna/Reset' })
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logOut())
      }
      dispatch({
        type: 'qna/Fail',
        payload: message,
      })
    }
  }

//ADD QNA

export const addQnA = (qna) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'qna/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(`${URL}/api/qnas`, qna, config)
    dispatch({ type: 'qna/addQnASuccess' })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'user/Fail',
      payload: message,
    })
  }
}

//DELETE QNA

export const deleteQnA = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'qna/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`${URL}/api/qnas/${id}`, config)
    dispatch({ type: 'qna/deleteQnASuccess' })
    dispatch(getListQnAs())
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'user/Fail',
      payload: message,
    })
  }
}
// EDIT QNA

export const editQnA = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'qna/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${URL}/api/qnas/${id}`, config)
    dispatch(getListQnAs())
    dispatch({ type: 'qna/editQnASuccess', payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({ type: 'qna/Fail', payload: message })
  }
}

// UPDATE QNA

export const updateQnA = (qna) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'qna/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`${URL}/api/qnas/${qna._id}`, qna, config)
    dispatch({ type: 'qna/updateQnASuccess', payload: data })
    dispatch(getListQnAs())
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'qna/Fail',
      payload: message,
    })
  }
}

export default qnaSlice.reducer

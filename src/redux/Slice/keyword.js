import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logOut } from './user'

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState: {
    loading: false,
    error: false,
    listKeywords: null,
  },
  reducers: {
    Request: (state) => {
      state.loading = true
      state.success = false
    },
    Fail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
    Reset: (state) => {
      state.success = false
      state.error = false
    },
    extractKeywordsSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.listKeywords = action.payload
    },
  },
})

// EXTRACT KEYWORDS FROM QUESTION
export const extractKeywords = (question) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'keyword/Request' })
    const { userLogin: userInfo } = getState()
    const config = {
      Headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/qnas/extract`, { question }, config)
    dispatch({ type: 'keyword/extractKeywordsSuccess', payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'keyword/Fail',
      payload: message,
    })
  }
}

export default keywordSlice.reducer

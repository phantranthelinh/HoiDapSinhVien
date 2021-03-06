import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const userLoginFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
export const listUsersLoginFromLocalStorage = localStorage.getItem('listUsers')
  ? JSON.parse(localStorage.getItem('listUsers'))
  : []

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginSuccess: false,
    loading: false,
    error: false,
    success: false,
    addUserSuccess: false,
    userInfo: userLoginFromLocalStorage,
    listUsers: listUsersLoginFromLocalStorage,

    user: {},
  },
  reducers: {
    Request: (state) => {
      state.loading = true
    },
    Fail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
    Reset: (state) => {
      state.loading = false
      state.success = false
      state.error = false
      state.addUserSuccess = false
      state.deleteSuccess = false
    },
    logOut: (state) => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('listDepartmets')
      state.loginSuccess = false
      state.userInfo = null
      window.location.href = '/login'
    },
    loginSuccess: (state, action) => {
      state.loginSuccess = true
      state.loading = false
      state.userInfo = action.payload
    },
    addUserSuccess: (state) => {
      state.loading = false
      state.addUserSuccess = true
    },
    listUsersSuccess: (state, action) => {
      state.loading = false
      state.listUsers = action.payload
    },
    deleteUserSuccess: (state) => {
      state.deleteSuccess = true
    },
    editUserSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    updateUserSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.user = action.payload
    },
    getUserMessageSuccess: (state, action) => {
      state.loading = false
      state.listMessage = action.payload
    },
    deleteMessageSuccess: (state) => {
      state.actionSuccess = true
    },
  },
})

//USER LOGIN
export const logIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'user/Request' })
    const config = {
      headers: {
        'Context-Type': 'application/json',
      },
    }
    const { data } = await axios.post(`/api/users/login`, { email, password }, config)
    dispatch({ type: 'user/loginSuccess', payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
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

//ADD USER

export const addUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'user/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(`/api/users`, user, config)
    dispatch({ type: 'user/addUserSuccess' })
    dispatch(getListUsers())
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

//LIST USER
export const getListUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'user/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users`, config)
    dispatch({ type: 'user/listUsersSuccess', payload: data })
    localStorage.setItem('listUsers', JSON.stringify(data))
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

//DELETE USER

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)
    dispatch({ type: 'user/deleteUserSuccess' })
    dispatch(getListUsers())
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

//EDIT USER

export const editUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'user/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)
    dispatch({ type: 'user/editUserSuccess', payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({ type: 'user/Fail', payload: message })
  }
}

// UPDATE USER

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'user/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/${user._id}`, user, config)
    dispatch({ type: 'user/updateUserSuccess', payload: data })
    dispatch({ type: 'user/Reset' })
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
//DELETE MESSAGE

export const { logOut } = userSlice.actions
export default userSlice.reducer

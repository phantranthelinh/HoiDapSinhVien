import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logOut } from './user'

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    loading: false,
    success: false,
    error: false,
    department: {},
    messageDelete: null,
    listDepartments: [],
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
      state.loading = false
      state.actionSuccess = false
      state.error = false
    },
    addDepartmentSuccess: (state, action) => {
      state.message = action.payload
      state.actionSuccess = true
    },
    listDepartmentsSuccess: (state, action) => {
      state.loading = false
      state.listDepartments = action.payload
    },
    deleteDepartmentSuccess: (state, action) => {
      state.loading = false
      state.actionSuccess = true
      state.messageDelete = action.payload
    },
    editDepartmentSuccess: (state, action) => {
      state.loading = false
      state.department = action.payload
    },
    updateDepartmentsSuccess: (state, action) => {
      state.loading = false
      state.actionSuccess = true
      state.department = action.payload
    },
  },
})
//ADD DEPARTMENT

export const addDepartment = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'department/Request' })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/departments`, { name }, config)
    dispatch({ type: 'department/addDepartmentSuccess', payload: data })
    dispatch(getListDepartments())
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'department/Fail',
      payload: message,
    })
  }
}

//LIST DEPARTMENTS

export const getListDepartments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'department/Request' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(` /api/departments/all`, config)
    dispatch({ type: 'department/listDepartmentsSuccess', payload: data })
    dispatch({ type: 'department/Reset' })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'department/Fail',
      payload: message,
    })
  }
}

//DELETE DEPARTMENT

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'department/Request' })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(` /api/departments/${id}`, config)
    dispatch({ type: 'department/deleteDepartmentSuccess' })
    dispatch(getListDepartments())
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'department/Fail',
      payload: message,
    })
  }
}

//EDIT DEPARTMENT

export const editDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'department/Request' })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/departments/${id}`, config)
    dispatch({ type: 'department/editDepartmentSuccess', payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({ type: 'department/Fail', payload: message })
  }
}

// UPDATE DEPARTMENT

export const updateDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'department/Request' })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/departments/${department._id}`, department, config)
    dispatch({ type: 'department/updateDepartmentsSuccess', payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logOut())
    }
    dispatch({
      type: 'department/Fail',
      payload: message,
    })
  }
}
export default departmentSlice.reducer

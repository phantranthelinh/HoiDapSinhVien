import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logOut } from "./user";
import { URL } from "../Url";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    loading: false,
    success: false,
    error: false,
    department: {},
    listDepartments: {},
  },
  reducers: {
    Request: (state) => {
      state.loading = true;
      state.success = false;
    },
    Fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    Reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    },
    addDepartmentSuccess: (state, action) => {
      state.success = true;
      state.department = action.payload;
    },
    listDepartmentsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.listDepartments = action.payload;
    },
    deleteDepartmentSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    editDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.department = action.payload;
    },
    updateDepartmentsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.department = action.payload;
    },
  },
});
//ADD DEPARTMENT

export const addDepartment = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: "department/Request" });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${URL}/api/departments`,
      { name },
      config
    );
    dispatch({ type: "department/addDepartmentSuccess", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "department/Fail",
      payload: message,
    });
  }
};

//LIST DEPARTMENTS

export const getListDepartments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "department/Request" });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/departments/all`, config);
    dispatch({ type: "department/listDepartmentsSuccess", payload: data });
    dispatch({ type: "department/Reset" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "department/Fail",
      payload: message,
    });
  }
};

//DELETE DEPARTMENT

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "department/Request" });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/departments/${id}`, config);
    dispatch({ type: "department/deleteDepartmentSuccess" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "department/Fail",
      payload: message,
    });
  }
};

//EDIT DEPARTMENT

export const editDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "department/Request" });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/departments/${id}`, config);
    dispatch({ type: "department/editDepartmentSuccess", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({ type: "department/Fail", payload: message });
  }
};

// UPDATE DEPARTMENT

export const updateDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({ type: "department/Request" });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${URL}/api/departments/${department._id}`,
      department,
      config
    );
    dispatch({ type: "department/updateDepartmentsSuccess", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "department/Fail",
      payload: message,
    });
  }
};
export default departmentSlice.reducer;

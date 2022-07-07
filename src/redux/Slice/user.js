import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../url";
export const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginSuccess: false,
    loading: false,
    error: false,
    userInfo: userInfoFromLocalStorage,
  },
  reducers: {
    Request: (state) => {
      state.loading = true;
    },
    Fail: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.loginSuccess = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.loginSuccess = false;
      state.userInfo = null;
      document.location.href = "/login";
      localStorage.removeItem("userInfo");
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "user/Request" });

    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/users/login`,
      { email, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "user/loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "user/Fail", payload: error });
  }
};

export default userSlice.reducer;

export const { logout } = userSlice.actions;

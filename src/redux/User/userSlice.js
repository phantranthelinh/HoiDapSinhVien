import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../Url";
export const userLoginFromLocalStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;

export const logIn = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const config = {
        Headers: {
          "Context-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${URL}/api/users/login`,
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginSuccess: false,
    loading: false,
    error: false,
    userInfo: userLoginFromLocalStorage,
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("userInfo");
      state.loginSuccess = false;
      document.location.href = "/login";
    },
  },
  extraReducers: {
    [logIn.pending]: (state) => {
      state.loading = true;
    },

    [logIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.loginSuccess = true;
    },
    [logIn.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.loginSuccess = false; //
    },
  },
});
export const { logOut } = userSlice.actions;
export default userSlice.reducer;

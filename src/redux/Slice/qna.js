import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../Url";
import { logOut } from "./user";

export const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    loading: false,
    success: false,
    error: false,
    listQnAs: [],
    QnA: {},
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
      state.success = false;
      state.error = false;
    },
    listQnAsSuccess: (state, action) => {
      state.success = true;
      state.listQnAs = action.payload;
      state.loading = false;
    },
  },
});

//LIST QNA

export const getListQnAs = () => async (dispatch) => {
  try {
    dispatch({ type: "qna/Request" });

    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${URL}/api/qnas`, config);
    dispatch({ type: "qna/listQnAsSuccess", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};

export default qnaSlice.reducer;

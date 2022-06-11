import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../Url";
import { logOut } from "./user";
export const newQuestionFromLocalStorage = JSON.parse(
  localStorage.getItem("newQuestions")
)
  ? JSON.parse(localStorage.getItem("newQuestions"))
  : [];
export const newQuestionSlice = createSlice({
  name: "newquestion",
  initialState: {
    loading: false,
    success: false,
    error: false,
    data: [],
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
    listNewQuestionSuccess: (state, action) => {
      state.success = true;
      state.data = action.payload;
      state.loading = false;
    },
    addQnASuccess: (state) => {
      state.success = true;
      state.loading = false;
    },
  },
});

//LIST QNA

export const getListNewQuestion = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "newquestion/Request" });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/newquestions`, config);
    dispatch({ type: "newquestion/listNewQuestionSuccess", payload: data });
    localStorage.setItem("newQuestions", JSON.stringify(data));
    dispatch({ type: "newquestion/Reset" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "newquestion/Fail",
      payload: message,
    });
  }
};

//ADD QNA

export const addQnA = (qna) => async (dispatch, getState) => {
  try {
    dispatch({ type: "qna/Request" });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`${URL}/api/qnas`, qna, config);
    dispatch({ type: "qna/addQnASuccess" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logOut());
    }
    dispatch({
      type: "user/Fail",
      payload: message,
    });
  }
};

export default newQuestionSlice.reducer;

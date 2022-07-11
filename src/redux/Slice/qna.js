import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../url";
import { logout } from "./user";

export const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    loading: false,
    error: false,
    QnA: {},
  },
  reducers: {
    Request: (state) => {
      state.loading = true;
      state.sendNewQuestionSuccess = false;
    },
    RequestGetByKeyword: (state) => {
      state.loadingQnAs = true;
    },
    Fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    Reset: (state) => {
      state.actionSuccess = false;
      state.error = false;
    },
    ResetSendNewQuestion: (state) => {
      state.sendNewQuestionSuccess = false;
    },
    getByKeywordSuccess: (state, action) => {
      state.actionSuccess = true;
      state.listQnAs = action.payload;
      state.loadingQnAs = false;
    },
    searchQnASuccess: (state, action) => {
      state.qnas = action.payload;
      state.loading = false;
    },
    sendHappySuccess: (state) => {
      state.loading = false;
      state.sendHappySuccess = true;
    },
    sendUnhappySuccess: (state) => {
      state.loading = false;

      state.sendUnhappySucess = true;
    },
    getSingleQnA: (state, action) => {
      state.success = true;
      state.QnA = action.payload;
    },
    sendNewQuestionSuccess: (state) => {
      state.sendNewQuestionSuccess = true;
    },
  },
});

export const getSingleQnA = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${URL}/api/qnas/${id}`, config);
    dispatch({ type: "qna/getSingleQnA", payload: data });
  } catch (error) {
    const message =
      error.reponse && error.reponse.data.message
        ? error.reponse.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};

export const searchQnA = (question) => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `${URL}/api/qnas/search?question=${question}`,
      config
    );
    dispatch({ type: "qna/searchQnASuccess", payload: data });
  } catch (error) {
    const message =
      error.reponse && error.reponse.data.message
        ? error.reponse.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};

export const getByKeyword = (keywords) => async (dispatch, getState) => {
  try {
    dispatch({ type: "qna/RequestGetByKeyword" });
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
      `${URL}/api/qnas/keywords`,
      { keywords },
      config
    );

    dispatch({ type: "qna/getByKeywordSuccess", payload: data });
  } catch (error) {
    const message =
      error.reponse && error.reponse.data.message
        ? error.reponse.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};

export const sendHappy = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "qna/Request" });
    const {
      userLogin: { userInfo },
    } = getState();
    const idUser = userInfo._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`${URL}/api/qnas/happy/${id}`, { idUser }, config);
    dispatch({ type: "qna/sendHappySucces" });
  } catch (error) {
    const message =
      error.reponse && error.reponse.data.message
        ? error.reponse.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};
export const sendUnhappy = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "qna/Request" });
    const {
      userLogin: { userInfo },
    } = getState();
    const idUser = userInfo._id;

    const config = {
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`${URL}/api/qnas/unhappy/${id}`, { idUser }, config);

    dispatch({ type: "qna/sendUnhappySucces" });
  } catch (error) {
    const message =
      error.reponse && error.reponse.data.message
        ? error.reponse.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};

export const sendNewQuesiton = (question) => async (dispatch, getState) => {
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
    await axios.post(`${URL}/api/messages/`, { question }, config);
    dispatch({ type: "qna/sendNewQuestionSuccess" });
    dispatch({ type: "qna/ResetSendNewQuestion" });
  } catch (error) {
    const message =
      error.reponse && error.reponse.data.message
        ? error.reponse.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "qna/Fail",
      payload: message,
    });
  }
};

export default qnaSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./user";

export const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    loading: false,
    error: false,
    QnA: {},
    listQnA: [],
    qnas: [],
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
    getListQnASuccess: (state, action) => {
      state.listQnA = action.payload;
    },
    sendNewQuestionSuccess: (state) => {
      state.sendNewQuestionSuccess = true;
    },
    updateHappy: (state, action) => {
      const { data, id } = action.payload;

      if (state.qnas) {
        state.qnas = state.qnas.map((qna) =>
          qna.id === id ? qna.happies.push(data) : qna
        );
      }
    },
    updateUnhappy: (state, action) => {
      const { data, id } = action.payload;
      if (state.qnas) {
        state.qnas = state.qnas.map((qna) =>
          qna.id === id ? qna.unhappies.push(data) : qna
        );
      }
    },
  },
});

export const getListQnA =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/qnas/all?page=${page}`, config);
      dispatch({ type: "qna/getListQnASuccess", payload: data.QAs });
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

    const { data } = await axios.get(`/api/qnas/${id}`, config);
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
      `/api/qnas/search?question=${question}`,
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

// export const getByKeyword = (keywords) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: "qna/RequestGetByKeyword" });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         "Context-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.post(
//       `/api/qnas/keywords`,
//       { keywords },
//       config
//     );

//     dispatch({ type: "qna/getByKeywordSuccess", payload: data });
//   } catch (error) {
//     const message =
//       error.reponse && error.reponse.data.message
//         ? error.reponse.data.message
//         : error.message;

//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: "qna/Fail",
//       payload: message,
//     });
//   }
// };

export const sendHappy = (id) => async (dispatch, getState) => {
  try {
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
    const { data } = await axios.put(
      `/api/qnas/happy/${id}`,
      { idUser },
      config
    );
    dispatch({ type: "qna/updateHappy", payload: { data, id } });
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
    const { data } = await axios.put(
      `/api/qnas/unhappy/${id}`,
      { idUser },
      config
    );
    dispatch({ type: "qna/updateUnhappies", payload: { data, id } });
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
    await axios.post(`/api/messages/`, { question }, config);
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

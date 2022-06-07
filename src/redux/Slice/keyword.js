import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../Url";

export const keywordSlice = createSlice({
  name: "qna",
  initialState: {
    loading: false,
    error: false,
    listKeywords: [],
  },
  reducers: {
    extractKeywordLoading: (state) => {
      state.loading = true;
    },
    extractKeywordRecieve: (state, action) => {
      state.listKeywords = action.payload;
      state.loading = false;
    },
  },
  extraReducers: {},
});

// EXTRACT KEYWORDS FROM QUESTION
export const extractKeywords = (question) => async (dispatch, getState) => {
  try {
    dispatch(extractKeywordLoading());
    const { userLogin: userInfo } = getState();
    const config = {
      Headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${URL}/api/qnas/extract`,
      { question },
      config
    );
    console.log({ data });
    dispatch(extractKeywordRecieve(data));
  } catch (err) {
    console.error(err);
  }
};

export const { extractKeywordLoading, extractKeywordRecieve } =
  keywordSlice.actions;
export default keywordSlice.reducer;

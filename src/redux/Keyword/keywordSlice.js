import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "axios";
import { URL } from "../Url";

export const extractKeywords = createAsyncThunk(
  "QNA/EXTRACT-KEYWORD",
  async (question) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log("🚀 ~ file: keywordSlice.js ~ line 8 ~ question", question);

      const { data } = await axios.post(`${URL}/api/qnas/extract`, config, {
        question,
      });
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const keywordSlice = createSlice({
  name: "qna",
  initialState: {
    loading: false,
    error: false,
    listKeywords: [],
  },
  extraReducers: {
    [extractKeywords.pending]: (state) => {
      state.loading = true;
    },
    [extractKeywords.fulfilled]: (state, action) => {
      state.loading = false;
      state.listKeywords = action.payload;
    },
    [extractKeywords.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default keywordSlice.reducer;

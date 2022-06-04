import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import keywordReducer from "./Keyword/keywordSlice";
export const store = configureStore({
  reducer: {
    userLogin: userReducer,
    keywords: keywordReducer,
  },
});

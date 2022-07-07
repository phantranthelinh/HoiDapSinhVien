import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/user";
import qnaReducer from "./Slice/qna";
export const store = configureStore({
  reducer: {
    userLogin: userReducer,
    qnas: qnaReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/user";
import keywordReducer from "./Slice/keyword";
import departmentReducer from "./Slice/department";

export const store = configureStore({
  reducer: {
    userLogin: userReducer,
    keywords: keywordReducer,
    departments: departmentReducer,
  },
});

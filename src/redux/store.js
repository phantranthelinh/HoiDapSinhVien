import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slice/user'
import keywordReducer from './Slice/keyword'
import departmentReducer from './Slice/department'
import qnaReducer from './Slice/qna'
import messageReducer from './Slice/newMessage'
export const store = configureStore({
  reducer: {
    userLogin: userReducer,
    keywords: keywordReducer,
    departments: departmentReducer,
    qnas: qnaReducer,
    messages: messageReducer,
  },
})

import React from 'react'
import './App.css'
import './responsive.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import QnAScreen from './screens/QnAScreen'
import AddQnA from './screens/AddQnA'
import AddUser from './screens/AddUser'

import Login from './screens/LoginScreen'
import UsersScreen from './screens/UsersScreen'
import QnAEditScreen from './screens/QnAEditScreen'
import NotFound from './screens/NotFound'
import PrivateRouter from './PrivateRouter'
import AdminRouter from './AdminRouter'
import AddDepartment from './screens/AddDepartment'
import DepartmentsScreen from './screens/DepartmentsScreen'
import DepartmentEditScreen from './screens/DepartmentEditScreen'
import UserEditScreen from './screens/UserEditScreen'
import newQuestionScreen from './screens/NewQuestionScreen'
import AddQnAsFile from './screens/AddQnAsFile'
import MessageScreen from './screens/MessageScreen'
import AddAnswer from './screens/AddAnswer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/qnas" component={QnAScreen} />
          <PrivateRouter path="/messages" component={MessageScreen} />
          <PrivateRouter path="/add-qna/:question" component={AddAnswer} />
          <PrivateRouter path="/add-qna" component={AddQnA} />
          <PrivateRouter path="/add-qnas-file" component={AddQnAsFile} />

          <AdminRouter path="/add-user" component={AddUser} />
          <AdminRouter path="/newquestions" component={newQuestionScreen} />
          <AdminRouter path="/users" component={UsersScreen} />

          <AdminRouter path="/add-department" component={AddDepartment} />
          <AdminRouter path="/departments" component={DepartmentsScreen} />

          <PrivateRouter path="/qna/:id/edit" component={QnAEditScreen} />
          <AdminRouter path="/department/:id/edit" component={DepartmentEditScreen} />

          <AdminRouter path="/user/:id/edit" component={UserEditScreen} />

          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

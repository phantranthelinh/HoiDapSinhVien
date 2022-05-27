import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import QnAScreen from "./screens/QnAScreen";
import AddQnA from "./screens/AddQnA";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import QnAEditScreen from "./screens/QnAEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/qnas" component={QnAScreen} />
          <PrivateRouter path="/add-qna" component={AddQnA} />
          <PrivateRouter path="/add-user" component={AddQnA} />

          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/qna/:id/edit" component={QnAEditScreen} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

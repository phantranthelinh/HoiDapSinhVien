import React from "react";

import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { loginSuccess, userInfo } = userLogin;

  return (
    <Route
      {...rest}
      component={(props) => {
        if (loginSuccess || userInfo) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
}

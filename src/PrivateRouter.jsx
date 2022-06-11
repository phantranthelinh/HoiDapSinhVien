import React from "react";

import { Redirect, Route } from "react-router-dom";

export default function PrivateRouter({ component: Component, ...rest }) {
  const token = window.localStorage.getItem("userInfo");

  return (
    <Route
      {...rest}
      component={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
}

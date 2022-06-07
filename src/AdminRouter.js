import React from "react";

import { Redirect, Route } from "react-router-dom";

export default function AdminRouter({ component: Component, ...rest }) {
  const token = JSON.parse(window.localStorage.getItem("userInfo"));
  return (
    <Route
      {...rest}
      component={(props) => {
        if (token.role === "admin") {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}

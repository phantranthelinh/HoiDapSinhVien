import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const auth = JSON.parse(window.localStorage.getItem("userInfo"));

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

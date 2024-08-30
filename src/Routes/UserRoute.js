import React from "react";
import { Route, Navigate } from "react-router-dom";

const CustomRoute = ({ component: Component, ...rest }) => {
  const userToken = window.localStorage.getItem("userToken");
  if (!userToken) {
    return <Navigate to="/user-login" />;
  }
  return <Route {...rest} element={<Component />} />;
};

export default CustomRoute;

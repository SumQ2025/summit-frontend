import React from "react";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const adminToken = window.localStorage.getItem("userToken");
  if (!adminToken) {
    return <Navigate to="/admin-login" />;
  }
  return <Route {...rest} element={<Component />} />;
};

export default AdminRoute;

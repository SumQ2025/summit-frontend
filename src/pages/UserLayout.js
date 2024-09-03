import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout = () => {
  const userId = window.localStorage.getItem("userToken");
  if (userId) {
    return <Outlet />;
  }
  return <Navigate to="/user-login" />;
};

export default UserLayout;

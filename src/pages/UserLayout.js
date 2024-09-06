import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UserLayout = () => {
  const [isLoading, setIsLoading] = useState("false");

  const userId = window.localStorage.getItem("userToken");

  if (userId) {
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            right: "40%",
            translate: "-50%, -50%",
          }}
          className={isLoading === true ? "" : "hidden"}
        >
          <CircularProgress size={60} sx={{ color: "#2f94f3" }} />
        </Box>
        <Outlet context={{ setIsLoading }} />
      </>
    );
  }
  return <Navigate to="/user-login" />;
};

export default UserLayout;

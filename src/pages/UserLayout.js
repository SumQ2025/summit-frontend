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
            position: "absolute",
            top: "50%",
            right: "45%",
            translate: "-50%, -50%",
          }}
          className={isLoading === true ? "" : "hidden"}
        >
          <CircularProgress size={60} sx={{ color: "white" }} />
        </Box>
        <Outlet context={{ setIsLoading }} />
      </>
    );
  }
  return <Navigate to="/user-login" />;
};

export default UserLayout;

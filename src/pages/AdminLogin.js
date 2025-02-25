import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import logo from "../assets/img/logo.svg";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const param = {
      password,
    };
    const response = await axios.post(`${SERVER_URL}/adminLogin`, param);
    if (response.data.message === "success") {
      window.localStorage.setItem("adminToken", "adminToken");
      navigate("/admin/photo");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-[50px] gap-[15px] w-[400px] items-center absolute top-[45%] translate-y-[-50%]">
        <img src={logo} className="w-[150px]" />
        <TextField
          label="Password"
          variant="standard"
          className="w-full"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          className="w-full"
          sx={{ backgroundColor: "#1d488b", marginTop: "10px" }}
          onClick={login}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;

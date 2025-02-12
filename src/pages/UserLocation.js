import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import logo from "../assets/img/logo.svg";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserLocation = () => {
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    setLocationId(event.target.value);
  };

  const next = () => {
    const param = { locationId };
    navigate("/user/panel", { state: param });
  };

  useEffect(() => {
    const getLocation = async () => {
      const userId = window.localStorage.getItem("userToken");
      const param = {
        userId,
      };
      const response = await axios.post(`${SERVER_URL}/getLocationById`, param);
      if (response.data.message === "success") {
        setLocations(response.data.locations);
      }
    };
    getLocation();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-[50px] gap-[15px] w-[400px] items-center absolute top-[45%] translate-y-[-50%]">
        <img src={logo} className="w-[150px]" />
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">
            select location name
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={locationId}
            label="select location name"
            onChange={handleLocationChange}
          >
            {locations.length > 0 &&
              locations.map((location, key) => {
                return (
                  <MenuItem value={location._id} key={key}>
                    {location.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          className="w-full"
          sx={{ backgroundColor: "#1d488b" }}
          onClick={next}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserLocation;

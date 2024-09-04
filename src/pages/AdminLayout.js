import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import PhotoIcon from "@mui/icons-material/Photo";
import GroupsIcon from "@mui/icons-material/Groups";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import { logoutAdmin } from "../utils";

import logo from "../assets/img/logo.svg";
import defaultImg from "../assets/img/sketch.jpg";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
};

const clueStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
};

const AdminLayout = () => {
  const [teamModal, setTeamModal] = useState(false);
  const [clueModal, setClueModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [locationname, setLocationname] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [file, setFile] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [isLoading, setIsLoading] = useState("false");

  const clueImgRef = useRef(null);
  const defaultImgRef = useRef(null);

  const url = useLocation();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const adminToken = window.localStorage.getItem("adminToken");

  const addTeam = async () => {
    if (password !== rePassword) {
      alert("password doesn't match");
      return;
    }
    const param = {
      companyName,
      teamNumber,
      password,
    };

    const response = await axios.post(`${SERVER_URL}/addTeam`, param);
    if (response.data.message === "success") {
      window.location.href = "/admin/team";
    }
  };

  const addClue = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("value", value);
    formData.append("description", description);
    formData.append("locationId", locationId);

    try {
      const response = await axios.post(`${SERVER_URL}/addClue`, formData);
      if (response.data.message === "success") {
        window.location.href = "/admin/clue";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLocation = async () => {
    const param = {
      locationName: locationname,
    };
    try {
      const response = await axios.post(`${SERVER_URL}/addLocation`, param);
      if (response.data.message === "success") {
        window.location.href = "/admin/location";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = (event) => {
    setLocationId(event.target.value);
  };

  const handleClueImg = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onload = function (e) {
        defaultImgRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${SERVER_URL}/getLocations`);
      setLocations(response.data.locations);
      setLocationId(response.data.locations[0]._id);
    };

    setCurrentPath(url.pathname);
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPath(url.pathname);
  }, [url]);

  if (adminToken) {
    return (
      <div className="flex">
        <div className="min-h-screen h-full bg-[#1f262d] pt-[20px] text-white w-[240px] text-[19px]">
          <div className="flex justify-center mr-8 mb-2">
            <img src={logo} alt="logo" className="w-[150px]" />
          </div>
          <Link to="/admin/photo">
            <div
              className={`flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6] ${
                currentPath == "/admin/photo" ? "sidebar-active" : ""
              }`}
            >
              <PhotoIcon />
              Photos
            </div>
          </Link>
          <Link to="/admin/team">
            <div
              className={`flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6] ${
                currentPath == "/admin/team" ? "sidebar-active" : ""
              }`}
            >
              <GroupsIcon />
              Teams
            </div>
          </Link>
          <Link to="/admin/clue">
            <div
              className={`flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6] ${
                currentPath == "/admin/clue" ? "sidebar-active" : ""
              }`}
            >
              <ClearAllIcon />
              Clues
            </div>
          </Link>
          <Link to="/admin/location">
            <div
              className={`flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6] ${
                currentPath == "/admin/location" ? "sidebar-active" : ""
              }`}
            >
              <LocationOnIcon />
              Locations
            </div>
          </Link>
          {/* <Link to="/">
            <div
              className={`flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]`}
            >
              <DownloadIcon />
              Download Photos
            </div>
          </Link> */}
          <Link to="/">
            <div
              className={`flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]`}
              onClick={logoutAdmin}
            >
              <LogoutIcon />
              Logout
            </div>
          </Link>
        </div>
        <div className="grow text-white flex flex-col">
          <div className="bg-[#141619] p-[15px] flex justify-center gap-10">
            <div className="flex gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-200">
              <PersonAddAlt1Icon />
              <button
                onClick={() => {
                  setTeamModal(true);
                }}
              >
                Add Team
              </button>
            </div>
            <div className="flex gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-200">
              <PlaylistAddIcon />
              <button
                onClick={() => {
                  setClueModal(true);
                }}
              >
                Add Clue
              </button>
            </div>
            <div className="flex gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-200">
              <AddPhotoAlternateIcon />
              <button
                onClick={() => {
                  setLocationModal(true);
                }}
              >
                Add Location
              </button>
            </div>
          </div>
          <div className="flex justify-center bg-[#eeeeee] h-full p-5">
            <Outlet context={{ setIsLoading }} />
          </div>
        </div>

        <Modal
          keepMounted
          open={teamModal}
          onClose={() => {
            setTeamModal(false);
          }}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div className="bg-[#1d488b] text-white p-3 text-[20px]">
              <span>Fill the detail of new team</span>
            </div>
            <div className="pt-[20px] p-[30px] flex flex-col gap-[15px]">
              <TextField
                label="Company Name"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                required={true}
              />
              <TextField
                label="Team Number"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setTeamNumber(e.target.value);
                }}
                required={true}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required={true}
              />
              <TextField
                label="Password Confirm"
                type="password"
                autoComplete="current-password"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
              />
              <div className="mt-1">
                <Button
                  variant="contained"
                  className="w-full"
                  sx={{ backgroundColor: "#1d488b" }}
                  onClick={addTeam}
                >
                  Add
                </Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          keepMounted
          open={clueModal}
          onClose={() => {
            setClueModal(false);
          }}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={clueStyle}>
            <div className="bg-[#1d488b] text-white p-3 text-[20px]">
              <span>Fill the detail of new clue</span>
            </div>
            <div className="pt-[20px] p-[30px] flex flex-col gap-[15px]">
              <TextField
                label="Title"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                label="Value"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <TextField
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <FormControl fullWidth>
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
              <InputLabel id="demo-simple-select-label">
                Click image to upload new photo
              </InputLabel>
              <div className="flex justify-center border-[1px] p-2">
                <img
                  src={defaultImg}
                  alt="defaultImg"
                  ref={defaultImgRef}
                  className="w-[200px]"
                  onClick={() => {
                    clueImgRef.current.click();
                  }}
                />
                <input
                  type="file"
                  className="hidden"
                  ref={clueImgRef}
                  onChange={handleClueImg}
                />
              </div>
              <div className="mt-1">
                <Button
                  variant="contained"
                  className="w-full"
                  sx={{ backgroundColor: "#1d488b" }}
                  onClick={addClue}
                >
                  Add
                </Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          keepMounted
          open={locationModal}
          onClose={() => {
            setLocationModal(false);
          }}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div className="bg-[#1d488b] text-white p-3 text-[20px]">
              <span>Fill the detail of new location</span>
            </div>
            <div className="pt-[20px] p-[30px] flex flex-col gap-[15px]">
              <TextField
                label="Location name"
                variant="standard"
                className="w-full"
                onChange={(e) => {
                  setLocationname(e.target.value);
                }}
              />
              <div className="mt-1">
                <Button
                  variant="contained"
                  className="w-full"
                  sx={{ backgroundColor: "#1d488b" }}
                  onClick={addLocation}
                >
                  Add
                </Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "45%",
            translate: "-50%, -50%",
          }}
          className={isLoading === true ? "" : "hidden"}
        >
          <CircularProgress size={60} />
        </Box>
      </div>
    );
  }
  return <Navigate to="/admin-login" />;
};

export default AdminLayout;

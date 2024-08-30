import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import PhotoIcon from "@mui/icons-material/Photo";
import GroupsIcon from "@mui/icons-material/Groups";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import logo from "../assets/img/logo.svg";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
};

const Layout = () => {
  const [teamModal, setTeamModal] = useState(false);
  const [clueModal, setClueModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#1f262d] pt-[20px] text-white h-screen w-[240px] text-[19px]">
        <div className="flex justify-center mr-8 mb-2">
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <Link to="/">
          <div className="flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]">
            <PhotoIcon />
            Photos
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]">
            <GroupsIcon />
            Teams
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]">
            <ClearAllIcon />
            Clues
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]">
            <LocationOnIcon />
            Locations
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]">
            <DownloadIcon />
            Download Photos
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-3 items-center pl-[20px] p-[15px] hover:bg-[#27a9e3] hover:text-white transition-all duration-200 text-[#a0a3a6]">
            <LogoutIcon />
            Logout
          </div>
        </Link>
      </div>
      <div className="grow text-white">
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
        <Outlet />
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
              id="standard-basic"
              label="Company Name"
              variant="standard"
              className="w-full"
            />
            <TextField
              id="standard-basic"
              label="Team Number"
              variant="standard"
              className="w-full"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              className="w-full"
            />
            <TextField
              id="standard-password-input"
              label="Password Confirm"
              type="password"
              autoComplete="current-password"
              variant="standard"
              className="w-full"
            />
            <div className="mt-1">
              <Button variant="outlined" className="w-full">
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
        <Box sx={style}>
          <div className="bg-[#1d488b] text-white p-3 text-[20px]">
            <span>Fill the detail of new clue</span>
          </div>
          <div className="pt-[20px] p-[30px] flex flex-col gap-[15px]">
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              className="w-full"
            />
            <TextField
              id="standard-basic"
              label="Value"
              variant="standard"
              className="w-full"
            />
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              variant="standard"
            />
            <div className="mt-1">
              <Button variant="outlined" className="w-full">
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
              id="standard-basic"
              label="Location name"
              variant="standard"
              className="w-full"
            />
            <div className="mt-1">
              <Button variant="outlined" className="w-full">
                Add
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Layout;

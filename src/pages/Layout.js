import React from "react";
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

import logo from "../assets/img/logo.svg";

const Layout = () => {
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
            <button>Add Team</button>
          </div>
          <div className="flex gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-200">
            <PlaylistAddIcon />
            <button>Add Clue</button>
          </div>
          <div className="flex gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-200">
            <AddPhotoAlternateIcon />
            <button>Add Location</button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

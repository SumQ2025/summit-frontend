import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

import LogoutIcon from "@mui/icons-material/Logout";

import ClueCard from "../components/ClueCard";
import { logoutUser } from "../utils";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserPanel = () => {
  const location = useLocation();

  const { locationId } = location.state;

  const [clues, setClues] = useState([]);
  const [locationName, setLocationName] = useState("");

  const logout = () => {
    logoutUser();
  };

  const init = async () => {
    const userId = window.localStorage.getItem("userToken");
    const param = { userId, locationId };
    const response = await axios.post(`${SERVER_URL}/getCluesById`, param);
    if (response.data.message === "success") {
      setClues(response.data.clues);
      setLocationName(response.data.locationName.name);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col justify-center bg-[#124a7d]">
      <div className="bg-[#1f262d] h-[50px] w-full fixed top-0 flex justify-between items-center text-white px-[15px] uppercase">
        <span>{locationName}</span>
        <LogoutIcon onClick={logout} />
      </div>
      <div className="bg-[#124a7d] w-full min-h-screen h-full p-[25px] gap-[15px] flex flex-col mt-[50px]">
        {clues.map((clue, index) => {
          return (
            <ClueCard
              key={index}
              id={clue._id}
              title={clue.title}
              point={clue.point}
              description={clue.description}
              path={clue.path}
              uploadedPath={clue.uploadedPath}
              locationId={locationId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserPanel;

import React from "react";
import ClueCard from "../components/ClueCard";
import { useSelector } from "react-redux";

const UserPanel = () => {
  const clues = useSelector((state) => state.clue.clues);
  
  return (
    <div>
      <div className="bg-[#124a7d] h-full p-[25px] flex flex-col gap-[15px]">
        <ClueCard />
        <ClueCard />
        <ClueCard />
      </div>
    </div>
  );
};

export default UserPanel;

import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ setSearchKey }) => {
  return (
    <div className="flex justify-center mb-[8px]">
      <div className="flex items-center text-black px-2 py-1 gap-1">
        <SearchIcon fontSize="large" />
        <input
          className="px-3 py-2 outline-none rounded-xl"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SearchBox;

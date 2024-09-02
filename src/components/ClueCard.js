import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto } from "../redux/clueSlice";

import sampleImg from "../assets/img/sketch.jpg";

const ClueCard = () => {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const filename = useSelector((state) => state.clue.filename);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    async function upload() {
      if (!file) {
        console.log("No file selected.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadPhoto(formData));
    }

    upload();
  }, [file]);

  const takePhoto = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full p-[24px] flex flex-col text-center rounded-[10px] bg-white">
      <span className="text-[#0b4c7a] text-[32px] leading-[40px] font-[700] uppercase font-sans">
        Welcome to the Blue Mountain Quest
      </span>
      <span className="mt-[10px] text-[20px] text-[#508dc5] uppercase font-[700]">
        10 POINTS
      </span>
      <span className="text-[16px] mt-[10px]">
        Take team selfie to test the system
      </span>
      <div className="w-full h-[120px] mt-[10px] flex justify-center">
        <img src={sampleImg} className="h-full object-contain" />
      </div>
      <button
        className="w-full bg-[#4ea191] rounded-[80px] h-[48px] uppercase font-[700] text-white mt-[16px]"
        onClick={takePhoto}
      >
        Take Photo
      </button>
      <button className="w-full bg-[#4ea191] rounded-[80px] h-[48px] uppercase font-[700] text-white mt-[16px]">
        View Photo
      </button>
      <button className="w-full bg-[#4ea191] rounded-[80px] h-[48px] uppercase font-[700] text-white mt-[16px]">
        Change Photo
      </button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        ref={fileRef}
      />
      <img src={`${SERVER_URL}/uploads/${filename}`} />
    </div>
  );
};

export default ClueCard;

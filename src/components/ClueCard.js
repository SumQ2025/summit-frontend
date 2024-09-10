import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ClueCard = ({
  id,
  title,
  point,
  description,
  path,
  uploadedPath,
  locationId,
  init,
}) => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const fileRef = useRef(null);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function upload() {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("locationId", locationId);
      formData.append("userId", window.localStorage.getItem("userToken"));
      formData.append("clueId", id);

      const response = await axios.post(`${SERVER_URL}/upload`, formData);
      alert(response.data);
      console.log(response.data.message);
      if (response.data.message === "success") {
        init();
      }
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
    <div className="w-full max-w-[400px] p-[24px] flex flex-col text-center rounded-[10px] bg-white">
      <span className="text-[#0b4c7a] text-[32px] leading-[40px] font-[700] uppercase font-sans">
        {title}
      </span>
      <span className="mt-[10px] text-[20px] text-[#508dc5] uppercase font-[700]">
        {point} POINTS
      </span>
      <span className="text-[16px] mt-[10px]">{description}</span>
      {path && (
        <div className="w-full h-[120px] mt-[10px] flex justify-center">
          <img
            src={`${SERVER_URL}/uploads/${path}`}
            className="h-full object-contain"
          />
        </div>
      )}
      {uploadedPath ? (
        <>
          <button
            className="w-full bg-[#4ea191] rounded-[80px] h-[48px] uppercase font-[700] text-white mt-[16px]"
            onClick={handleClickOpen}
          >
            View Photo
          </button>
          <button
            className="w-full bg-[#4ea191] rounded-[80px] h-[48px] uppercase font-[700] text-white mt-[16px]"
            onClick={takePhoto}
          >
            Change Photo
          </button>
        </>
      ) : (
        <button
          className="w-full bg-[#4ea191] rounded-[80px] h-[48px] uppercase font-[700] text-white mt-[16px]"
          onClick={takePhoto}
        >
          Take Photo
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        ref={fileRef}
      />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <img
            src={`${SERVER_URL}/uploads/${uploadedPath}`}
            className="w-[500px] max-w-full"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ClueCard;

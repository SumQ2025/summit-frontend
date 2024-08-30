import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  clues: [],
  filename: "",
};

export const uploadPhoto = createAsyncThunk("uploadPhoto", async (formData) => {
  try {
    const response = await axios.post(
      //   "https://aqueous-plains-92900-147f689c2375.herokuapp.com/upload",
      "http://localhost:5000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      }
    );
    return response.data.filename;
    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
});

export const clueSlice = createSlice({
  name: "clue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadPhoto.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.filename = action.payload;
      //   state.clues = action.payload.clues;
    });
  },
});

export default clueSlice.reducer;

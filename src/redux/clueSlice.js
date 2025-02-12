import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  clues: [],
  filename: "",
};

export const uploadPhoto = createAsyncThunk("uploadPhoto", async (formData) => {
  try {
    const response = await axios.post(
      //   "https://aqueous-plains-92900-147f689c2375.herokuapp.com/upload",
      `${SERVER_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.filename;
  } catch (error) {
    console.log("Error uploading file:", error);
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

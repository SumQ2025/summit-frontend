import { configureStore } from "@reduxjs/toolkit";
import clueReducer from "./clueSlice";

export default configureStore({
  reducer: {
    clue: clueReducer,
  },
});

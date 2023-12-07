import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

// Configuration Store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

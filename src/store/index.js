import { configureStore } from "@reduxjs/toolkit";
import workReducer from "./workSlice";

const store = configureStore({
  reducer: {
    work: workReducer
  }
});

export default store;

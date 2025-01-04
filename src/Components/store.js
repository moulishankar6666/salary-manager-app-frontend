import { configureStore } from "@reduxjs/toolkit";
import addUserInfo from "../Redux/userInfoSlice";

export const store = configureStore({
  reducer: {
    userinfo: addUserInfo,
  },
});

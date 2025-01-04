import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userinfo",
  initialState: {
    value: {
      data: {},
      status: "INITIAL",
      refresh: false,
    },
  },
  reducers: {
    addUserinfo: (state, action) => {
      state.value.data = action.payload;
    },
    updateStatus: (state, action) => {
      state.value.status = action.payload;
    },
    refreshData: (state, action) => {
      state.value.refresh = action.payload;
    },
  },
});

export const { addUserinfo, updateStatus, refreshData } = userInfoSlice.actions;
export default userInfoSlice.reducer;

// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  daDangNhap: false,
  user: null,
  token: null,
  expiresIn: 0,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    thoat: (state) => {
      state = initialState;
      localStorage.removeItem("authState");
    },
    dalogin: (state, param) => {
      state.token = param.payload.token;
      state.expiresIn = param.payload.expiresIn;
      state.user = param.payload.userInfo;
      state.daDangNhap = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const { dalogin, thoat } = authSlice.actions;
export default authSlice.reducer;

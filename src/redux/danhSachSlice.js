// file: danhSachSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const danhSachSlice = createSlice({
  name: 'danhsach',
  initialState: {
    danhSachList: [], // Ensure danhSachList is initialized properly
  },
  reducers: {
    setDanhSachList: (state, action) => {
      state.danhSachList = action.payload;
    },
  },
});

export const { setDanhSachList } = danhSachSlice.actions;

export default danhSachSlice.reducer;

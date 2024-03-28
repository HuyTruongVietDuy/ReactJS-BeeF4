import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  donhang: [],
};

const donhangSlice = createSlice({
  name: 'donhang',
  initialState,
  reducers: {
    setDonHang(state, action) {
      state.donhang = action.payload;
    },
  },
});

export const { setDonHang } = donhangSlice.actions;

export default donhangSlice.reducer;

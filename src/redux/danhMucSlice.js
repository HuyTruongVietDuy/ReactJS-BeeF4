import { createSlice } from '@reduxjs/toolkit';

export const danhMucSlice = createSlice({
  name: 'danhMuc',
  initialState: {
    danhMucList: [],
  },
  reducers: {
    setDanhMucList: (state, action) => {
      state.danhMucList = action.payload;
    }
  },
});

export const { setDanhMucList } = danhMucSlice.actions;

export default danhMucSlice.reducer;

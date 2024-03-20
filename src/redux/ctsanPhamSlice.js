import { createSlice } from '@reduxjs/toolkit';

export const chiTietSanPhamSlice = createSlice({
  name: 'chiTietSanPham',
  initialState: {
    chiTietSanPhamList: [],
  },
  reducers: {
    setChiTietSanPhamList: (state, action) => {
      state.chiTietSanPhamList = action.payload;
    }
  },
});

export const { setChiTietSanPhamList } = chiTietSanPhamSlice.actions;

export default chiTietSanPhamSlice.reducer;

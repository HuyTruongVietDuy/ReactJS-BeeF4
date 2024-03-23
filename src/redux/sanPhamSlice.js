import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SanPhamList: [],
};

const sanPhamSlice = createSlice({
  name: 'sanPham',
  initialState,
  reducers: {
    setSanPhamList(state, action) {
      state.SanPhamList = action.payload;
    },
  },
});

export const { setSanPhamList } = sanPhamSlice.actions;

export default sanPhamSlice.reducer;
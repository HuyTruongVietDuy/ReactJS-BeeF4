import { createSlice } from '@reduxjs/toolkit';

const saleProductSlice = createSlice({
  name: 'saleProducts',
  initialState: [], // Trạng thái ban đầu là một mảng rỗng
  reducers: {
    setSaleProducts: (state, action) => {
      return action.payload; // Cập nhật trạng thái với giá trị mới
    },
  },
});

export const { setSaleProducts } = saleProductSlice.actions;

export default saleProductSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const newProductsSlice = createSlice({
  name: 'newProducts',
  initialState: [],
  reducers: {
    setNewProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNewProducts } = newProductsSlice.actions;

export default newProductsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vouchers: [],
};

const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    setVouchers(state, action) {
      state.vouchers = action.payload;
    },
  },
});

export const { setVouchers } = voucherSlice.actions;

export default voucherSlice.reducer;

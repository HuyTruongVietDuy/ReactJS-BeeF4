import { configureStore } from '@reduxjs/toolkit';
import sanPhamReducer from './sanPhamSlice';
import danhMucReducer from './danhMucSlice';
import chiTietSanPhamReducer from './ctsanPhamSlice';
import donhangReducer from './donhangSlice';
import cartSlice from './cartSlice';
import authSlice from './authSlice';
import voucherSlice from './voucherSlice';
import baivietReducer from './baivietSlice';
import newProductsReducer from './newProductsSlice';

// Load the auth state from localStorage or use an empty object if it doesn't exist
const preloadedAuthState = JSON.parse(localStorage.getItem('authState')) || {};

export default configureStore({
  reducer: {
    danhMuc: danhMucReducer,
    sanPham: sanPhamReducer,
    chiTietSanPham:chiTietSanPhamReducer,
    donhang: donhangReducer,
    voucher: voucherSlice,
    newProducts: newProductsReducer,
    baiviet: baivietReducer,
    cart: cartSlice,
    auth: authSlice,
  },
   preloadedState: {
    auth: preloadedAuthState,
  },
});

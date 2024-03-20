import { configureStore } from '@reduxjs/toolkit';
import sanPhamReducer from './sanPhamSlice';
import danhMucReducer from './danhMucSlice';
import chiTietSanPhamReducer from './ctsanPhamSlice';
import cartSlice from './cartSlice';
import authSlice from './authSlice';

export default configureStore({
  reducer: {
    danhMuc: danhMucReducer,
    sanPham: sanPhamReducer,
    chiTietSanPham:chiTietSanPhamReducer,
    cart: cartSlice,
    auth: authSlice,
  },
});

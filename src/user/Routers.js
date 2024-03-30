// MainContent.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Component/home/home";
import Shop from "./Component/Shop/shop";
import SPTrongLoai from "./Component/SpTrongLoai/shop.js";
import UserDetail from "./Component/UserDetail";
import DangNhap from "./Component/login/dangnhap.js";
import DangKy from "./Component/login/dangky.js";
import QuenMatKhau from "./Component/login/quenmatkhau.js";
import TaoLaiMatKhau from "./Component/login/ThayDoiMatKhau.js";
import LienHe from "./Component/LienHe";
import ViewCart from "./Component/viewcart";
import ChiTietSanPham from "./Component/chitietsanpham";
import ChiTietDonHang from "./Component/ChiTietDonHang.js";
import SuaUser from "./Component/EditUser.js";
import BaoLoi from "./Component/Baoloi";
import GioiThieu from "./Component/GioiThieu";

import Loader from "./Loader.js"; // Import your Loader component

function MainContent({ loading }) {
  return (
    <main id="main">
      {loading ? (
        <Loader /> // Render the Loader component if loading is true
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopall" element={<Shop />} />
          <Route path="/:url_category" element={<SPTrongLoai />} />
          {/* <Route path="/:url_category_con" element={<SPTrongLoaiTrongLoai />} /> */}
          <Route path="/user" element={<UserDetail />} />
          <Route path="/chitietdonhang/:id_donhang" element={<ChiTietDonHang />} />
          <Route path="/suauser/:id_user" element={<SuaUser />} />
          <Route path="/dangnhap" element={<DangNhap />} />
          <Route path="/dangky" element={<DangKy />} />
          <Route path="/quenmatkhau" element={<QuenMatKhau />} />
          <Route path="/taomatkhaumoi/:id_user" element={<TaoLaiMatKhau />} />
          <Route path="/LienHe" element={<LienHe />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/gioithieu" element={<GioiThieu />} />
          <Route path="/chitietsanpham/:id_sanpham" element={<ChiTietSanPham />}/>
          <Route path="/baoloi" element={<BaoLoi />} />
          <Route path="*" element={<Navigate to="/baoloi" />} />
        </Routes>
      )}
    </main>
  );
}

export default MainContent;

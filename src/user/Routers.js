import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
import SanPhamYeuThich from "./Component/SanPhamYeuThich.js";
import ChiTietSanPham from "./Component/Chitietsanphamv2.js";
import ChiTietDonHang from "./Component/ChiTietDonHang.js";
import SuaUser from "./Component/EditUser.js";
import BaoLoi from "./Component/Baoloi";
import GioiThieu from "./Component/GioiThieu";
import BaiViet from "./Component/baiviet.js";
import ThanhToanSucces from "./Component/ThanhToanSucces.js";
import EditAddress from "./Component/EditAddress.js";
import Loader from "./Loader.js"; // Import your Loader component
import ChiTietBaiViet from "./Component/ChiTietBaiViet/ChiTietBaiViet.js";

function MainContent({ loading }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Reset scroll khi chuyển qua một route mới
    window.scrollTo(0, 0);
  }, [navigate]); // useEffect sẽ chỉ được gọi một lần sau khi component được render

  return (
    <main id="main">
      {loading ? (
        <Loader /> // Render the Loader component if loading is true
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopall" element={<Shop />} />
          <Route path="/:url_category" element={<SPTrongLoai />} />
          <Route path="/user" element={<UserDetail />} />
          <Route path="/chitietdonhang/:id_donhang" element={<ChiTietDonHang />} />
          <Route path="/suauser/:id_user" element={<SuaUser />} />
          <Route path="/dangnhap" element={<DangNhap />} />
          <Route path="/dangky" element={<DangKy />} />
          <Route path="/baiviet" element={<BaiViet />} />
          <Route path="/baiviet/:url_baiviet" element={<ChiTietBaiViet />} />
          <Route path="/quenmatkhau" element={<QuenMatKhau />} />
          <Route path="/taomatkhaumoi/:id_user" element={<TaoLaiMatKhau />} />
          <Route path="/lienhe" element={<LienHe />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/gioithieu" element={<GioiThieu />} />
          <Route path="/edit-address/:id_donhang" element={<EditAddress/>} />
          <Route path="/thanhtoanthanhcong/:id_donhang" element={< ThanhToanSucces/>} />
          <Route path="/sanphamyeuthich/:id_user" element={<SanPhamYeuThich />}/>
          {/* <Route path="/chitietsanpham/:id_sanpham" element={<ChiTietSanPham />}/> */}
          <Route path="/chitietsanpham/:url_product" element={<ChiTietSanPham />}/>
          <Route path="/baoloi" element={<BaoLoi />} />
          <Route path="*" element={<Navigate to="/baoloi" />} />
        </Routes>
      )}
    </main>
  );
}

export default MainContent;

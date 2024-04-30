 import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation,useNavigate } from "react-router-dom";

import DashBoard from "./Component/ThongKe/Dashboard";
import ListDanhMuc from "./Component/DanhMuc/DanhSach";
import ListSanPham from "./Component/SanPham/DanhSach";
import ListUser from "./Component/TaiKhoan/DanhSach";
import ListBill from "./Component/DonHang/DanhSach";
import ListChiTietSanPham from "./Component/ChiTietSanPham/DanhSach";
import ListMotChiTiet from "./Component/ChiTietSanPham/Listonect";
import KhoHang from "./Component/KhoHang/DanhSach";
import GiamGia from "./Component/GiamGia/DanhSach";
import ListBaiViet from "./Component/BaiViet/DanhSach";
import ThemBaiViet from "./Component/BaiViet/Them";
import SuaBaiViet from "./Component/BaiViet/Sua";
import Thongketong from "./Component/ThongKe/thongke-total";
import Thongkeproduct from "./Component/ThongKe/thongke-product";
import Thongkecategory from "./Component/ThongKe/thongke-category";
import ThongkeUser from "./Component/ThongKe/thongke-user";
import "./CSS Modules/index.css";
import "./CSS Modules/main.css";
import "./CSS Modules/style.css";
import "./CSS Modules/form.css";
import "./CSS Modules/thongke.css";
import { message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { thoat } from "../redux/authSlice";
function AdminIndex() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(thoat());
    message.success('Đăng xuất thành công');
    navigate('/login-admin'); // Redirect to "/dangnhap"
    window.location.reload();
    
};
  useEffect(() => {
    // Function to update date and time
    function updateDateTime() {
      // Lấy thẻ có class là "box-date-time"
      var boxDateTime = document.querySelector(".box-date-time");

      // Lấy ngày, tháng, năm hiện tại
      var currentDate = new Date();
      var hour = currentDate.getHours();
      var minute = currentDate.getMinutes();
      var second = currentDate.getSeconds();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
      var year = currentDate.getFullYear();
      boxDateTime.innerText =
        ("0" + hour).slice(-2) +
        ":" +
        ("0" + minute).slice(-2) +
        ":" +
        ("0" + second).slice(-2) +
        " - " +
        ("0" + day).slice(-2) +
        "/" +
        ("0" + month).slice(-2) +
        "/" +
        year;
    }

    // Gọi hàm updateDateTime mỗi giây
    const intervalId = setInterval(updateDateTime, 1000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  // active menu

  useEffect(() => {
    const activeLink = document.querySelector(".vertical-menu #a.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }

    const currentLink = document.querySelector(
      `.vertical-menu #a[href="${location.pathname}"]`
    );
    if (currentLink) {
      currentLink.classList.add("active");
    }
  }, [location.pathname]);

  return (
    <div id="admin-body">
      <header id="admin-header">
        <div className="admin-header-left">
          <div className="admin-logo">
            <img src="/images/SQBE Logo-black.png" alt="SQBE Logo" />
          </div>
        </div>
        <div className="admin-header-center">
          <div className="admin-center-left">
            <div className="admin-search">
              <input type="text" placeholder="Tìm kiếm....." />
              <button>
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
          <div className="admin-center-right">
            <div className="box-date-time"></div>
          </div>
        </div>
        <div className="admin-header-right">
          <div className="admin-box-user">
            <div className="box-user-left">
              <i className="material-icons">person</i>
            </div>
            <div className="box-user-right">
    {user.role === 3
      ? "Admin"
      : user.role === 2
      ? "Staff"
      : "Unknown Role"}
  </div>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <div className="admin-sidebar">
          <div className="admin-container-sidebar">
            <div className="admin-sidebar-top">
              <h1>
                <i className="material-icons">admin_panel_settings</i>Quản lí
              </h1>
              <div className="vertical-menu">
                <Link to="/admin/" id="a">
                  <i className="material-icons">dashboard</i>
                  <span>DashBoard</span>
                </Link>
                <Link to="/admin/danhsachdanhmuc" id="a">
                  <i className="material-icons">category</i>
                  <span>Danh Mục</span>
                </Link>
                <Link to="/admin/danhsachsanpham" id="a">
                  <i className="material-icons">shopping_cart</i>
                  <span>Sản Phẩm</span>
                </Link>
                <Link to="/admin/khohang" id="a">
                  <i className="material-icons">store</i>
                  <span>Kho Hàng</span>
                </Link>
                <Link to="/admin/danhsachtaikhoan" id="a">
                  <i className="material-icons">person</i>
                  <span>Tài Khoản</span>
                </Link>
                <Link to="/admin/danhsachdonhang" id="a">
                  <i className="material-icons">receipt</i>
                  <span>Đơn Hàng</span>
                </Link>
                <Link to="/admin/danhsachgiamgia" id="a">
                  <i className="material-icons">local_offer</i>
                  <span>Voucher giảm giá</span>
                </Link>
                <Link to="/admin/danhsachbaiviet" id="a">
                <i className="material-icons">bookmark</i>
                  <span>Bài viết</span>
                </Link>
                
              </div>
            </div>

            <div className="admin-sidebar-bottom">
              <a href="#setting" className="menu-link">
                <sub>
                  <i className="material-icons">settings</i>
                </sub>
                <span>Setting</span>
              </a>
              <a href="#logout" className="menu-link">
                <sub>
                  <i className="material-icons">exit_to_app</i>
                </sub>
                <span onClick={handleLogout}>Đăng Xuất</span>
              </a>
            </div>
          </div>
        </div>

        <div className="admin-main">
          <div className="admin-main-content">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/danhsachdanhmuc" element={<ListDanhMuc />} />
              <Route path="/danhsachsanpham" element={<ListSanPham />} />
              <Route path="/danhsachtaikhoan" element={<ListUser />} />
              <Route path="/danhsachdonhang" element={<ListBill />} />
              <Route
                path="/chitietsanpham/:id_sanpham"
                element={<ListChiTietSanPham />}
              />
              <Route
                path="/motchitiet/:id_chitietsp"
                element={<ListMotChiTiet />}
              />
              <Route path="/khohang" element={<KhoHang />} />
              <Route path="/danhsachgiamgia" element={<GiamGia />} />
              <Route path="/danhsachbaiviet" element={<ListBaiViet />} />
              <Route path="/them-bai-viet" element={<ThemBaiViet />} />
              <Route path="/edit-bai-viet/:id_baiviet" element={<SuaBaiViet />} />
              <Route path="/thongke-total" element={<Thongketong />} />
              <Route path="/thongke-product" element={<Thongkeproduct />} />
              <Route path="/thongke-category" element={<Thongkecategory />} />
              <Route path="/thongke-user" element={<ThongkeUser />} />
              <Route />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminIndex;

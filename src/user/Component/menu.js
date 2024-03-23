import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserNavMenu = () => {
  const [danhMucList, setDanhMucList] = useState([]);

  useEffect(() => {
    fetchDanhMucList();
  }, []);

  const fetchDanhMucList = async () => {
    try {
      const response = await fetch("http://localhost:4000/danhmuc/list");
      const data = await response.json();
      if (data.success) {
        // Filter danhMucList based on trang_thai === 2
        const filteredDanhMucList = data.danhMucList.filter(
          (danhMuc) => danhMuc.trang_thai === 2
        );
        setDanhMucList(filteredDanhMucList);
      } else {
        console.error("Đã xảy ra lỗi khi lấy danh sách danh mục.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi kết nối đến máy chủ:", error);
    }
  };

  return (
    <div className="user-header-center">
      <nav id="user-nav-menu">
        <ul className="main-menu">
          <li>
            <Link to="/">
              <span>Trang chủ</span>
            </Link>
          </li>
          <li className="has-dropdown">
            <Link to="/shopall" style={{ textDecoration: "none" }}>
              Sản phẩm{" "}
              <span className="material-icons" id="iccon-zoom-center">
                arrow_drop_down
              </span>
            </Link>
            <ul className="sub-menu">
              {danhMucList.map((danhMuc) => {
                if (!danhMuc.id_danhmuc_cha) {
                  // Only render if there is no parent ID
                  const subDanhMucs = danhMucList.filter(
                    (subDanhMuc) =>
                      subDanhMuc.id_danhmuc_cha === danhMuc.id_danhmuc &&
                      subDanhMuc.trang_thai === 2
                  );
                  if (subDanhMucs.length > 0) {
                    // Only render if there are sub-menus
                    return (
                      <li className="has-submenu" key={danhMuc.id_danhmuc}>
                        <span>{danhMuc.ten_danhmuc}</span>
                        <ul className="sub-sub-menu">
                          {subDanhMucs.map((subDanhMuc) => (
                            <li key={subDanhMuc.id_danhmuc}>
                              {subDanhMuc.ten_danhmuc}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                }
                return null; // Skip rendering if there is a parent ID or no sub-menus
              })}
            </ul>
          </li>
          
          <li>
            <Link to="/gioithieu">
              <span>Giới thiệu</span>
            </Link>
          </li>
          <li>
            <Link to="/lienhe">
              <span>Liên hệ</span>
            </Link>
          </li>
          <li>
            <span>Bài viết</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavMenu;

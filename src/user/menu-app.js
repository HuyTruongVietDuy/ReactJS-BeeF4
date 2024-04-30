import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const MenuApp = () => {
  const [danhMucCap2, setDanhMucCap2] = useState([]);
  const [danhMucCap3, setDanhMucCap3] = useState([]);
  const [isMenuCap2Open, setIsMenuCap2Open] = useState(false);
  const [openMenuCap3, setOpenMenuCap3] = useState({}); // Store open state for level 3
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  useEffect(() => {
    fetchDanhMucList();
  }, []);

  const fetchDanhMucList = async () => {
    try {
      const response = await fetch("https://api.sqbe.store/danhmuc/list");
      const data = await response.json();

      if (data.success) {
        const danhMucCap2 = data.danhMucList.filter(danhMuc => danhMuc.id_danhmuc_cha === null);
        const danhMucCap3 = data.danhMucList.filter(danhMuc => danhMuc.id_danhmuc_cha !== null);

        setDanhMucCap2(danhMucCap2);
        setDanhMucCap3(danhMucCap3);
      } else {
        console.error("Đã xảy ra lỗi khi lấy danh sách danh mục.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi kết nối đến máy chủ:", error);
    }
  };

  const handleIconClickMenuCap2 = (id_danhmuc_cha) => {
    setOpenMenuCap3(prevState => ({
      ...prevState,
      [id_danhmuc_cha]: !prevState[id_danhmuc_cha], // Toggle specific menu
    }));
  };

  const renderSubMenuCap3 = (id_danhmuc_cha) => {
    const danhMucCon = danhMucCap3.filter((danhMuc) => danhMuc.id_danhmuc_cha === id_danhmuc_cha);
  
    if (danhMucCon.length === 0) {
      return null; 
    }
  
    return (
      <ul className={`sub-submenu ${openMenuCap3[id_danhmuc_cha] ? 'open' : ''}`}>
        {danhMucCon.map((danhMuc) => (
          <li key={danhMuc.id_danhmuc}>
            <Link to={danhMuc.url_category}  style={{ fontSize: '3vw', color: 'white' }}>{danhMuc.ten_danhmuc}</Link>
          </li>
        ))}
      </ul>
    );
  };
  

  return (
    <div>
      <ul className="menu-list">
      <Link to="/"> <li className="menu-item">Trang chủ</li> </Link>
        <Link to="/shopall">   <li
          className={`menu-item ${isMenuCap2Open ? 'open' : ''}`}
          onClick={() => setIsMenuCap2Open(!isMenuCap2Open)}
        >
          Sản Phẩm
          <i
            className={`material-icons ${isMenuCap2Open ? 'arrow-up' : 'arrow-down'}`}
            style={{ float: 'right', cursor: 'pointer' }}
          >
            {isMenuCap2Open ? 'expand_less' : 'expand_more'}
          </i>
        </li>
        </Link>
        <ul className={`submenu ${isMenuCap2Open ? 'open' : ''}`}>
  {danhMucCap2.map((danhMuc, index) => (
    <li
      className="menu-item"
      key={danhMuc.id_danhmuc} // Sử dụng một `key` duy nhất
      onClick={() => handleIconClickMenuCap2(danhMuc.id_danhmuc)} 
    >
      <Link to={danhMuc.url_category} style={{ fontSize: '3.5vw', color: 'white' }}>
        {danhMuc.ten_danhmuc}
        <i
          className={`material-icons ${openMenuCap3[danhMuc.id_danhmuc] ? 'arrow-up' : 'arrow-down'}`}
          style={{ float: 'right', cursor: 'pointer' }}
        >
          {openMenuCap3[danhMuc.id_danhmuc] ? 'expand_less' : 'expand_more'}
        </i>
      </Link>
      {renderSubMenuCap3(danhMuc.id_danhmuc)} 
    </li>
  ))}
</ul>


        <Link to="/lienhe">  <li className="menu-item">Liên Hệ </li> </Link>
        <Link to="/gioithieu"> <li className="menu-item">Giới Thiệu</li></Link>
        <Link to="/baiviet">  <li className="menu-item">Bài Viết</li></Link>
        { !daDangNhap && ( // Nếu chưa đăng nhập, hiển thị "Đăng nhập" và "Đăng ký"
        <>
          <Link to="/dangnhap">
            <li className="menu-item">Đăng nhập</li>
          </Link>
          <Link to="/dangky">
            <li className="menu-item">Đăng ký</li>
          </Link>
        </>
      )}
      </ul>
    </div>
  );
};

export default MenuApp;

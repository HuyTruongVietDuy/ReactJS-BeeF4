import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Them from "./Them";
import { toggleForm } from "../../JS Modules/listDanhMucUtils";

const ListDiscountCodes = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState(""); // State để lưu trữ trạng thái được chọn từ dropdown

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/voucher/');
        setDiscountCodes(response.data);
      } catch (error) {
        console.error('Error fetching discount codes:', error);
      }
    };

    fetchDiscountCodes();
  }, []);

  const OpenAdd = () => {
    setShowForm(!showForm);
    toggleForm();
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Chưa cập nhật";
    const vietnamTime = new Date(dateTimeString).toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    return vietnamTime;
  };

  // Hàm xử lý sự kiện khi trạng thái được chọn từ dropdown thay đổi
  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Hàm để lọc danh sách mã giảm giá theo trạng thái được chọn
  const filteredDiscountCodes = discountCodes.filter((discountCode) => {
    if (filterStatus === "") {
      return true; // Nếu không có trạng thái được chọn thì hiển thị tất cả
    } else {
      return discountCode.trang_thai.toString() === filterStatus;
    }
  });

  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className='nav-left-admin'>
          <h1> Quản lí mã giảm giá</h1>
        </div>
        <div className="nav-right-admin">
          <select onChange={handleStatusFilterChange} value={filterStatus}>
            <option value="">Tất cả trạng thái</option>
            <option value="1">Chưa sử dụng</option>
            <option value="2">Đã sử dụng</option>
          </select>
          <button onClick={OpenAdd}>
            {" "}
            Thêm mới <i className="material-icons">add_circle</i>
          </button>
        </div>
      </div>
      <div className='admin-content-component'>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã giảm giá</th>
              <th>Phần trăm giảm</th>
              <th>Ngày giảm giá</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>  
          {filteredDiscountCodes.map((discountCode, index) => (
            <tr key={index}>
              <td>{discountCode.id_giamgia}</td>
              <td>{discountCode.ma_giamgia}</td>
              <td>{discountCode.phan_tram}%</td>
              <td> 
                <p>bắt đầu: {formatDateTime(discountCode.ngay_bat_dau)}</p>
                <p>kết thúc: {formatDateTime(discountCode.ngay_ket_thuc)}</p>
              </td>
              <td>{discountCode.so_luong}</td>
              <td style={{ color: discountCode.trang_thai === 1 ? 'green' : 'red' }}>
                {discountCode.trang_thai === 1 ? 'Chưa sử dụng' : 'Đã sử dụng'}
              </td>
              <td style={{ color: discountCode.tinh_trang === 1 ? 'green' : 'red' }}>
                {discountCode.tinh_trang === 1 ? 'đang hoạt động' : 'Khong hoạt động'}
              </td>
              <td><button id="button-xoa" >Xóa</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      
      <Them
        showForm={showForm}
        toggleForm={OpenAdd}
      />
    </div>
  );
};

export default ListDiscountCodes;

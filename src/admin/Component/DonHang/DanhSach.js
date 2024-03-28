import React, { useState, useEffect, useCallback } from "react";
import Xem from "./ChiTietDonHang";
import { useSelector, useDispatch } from 'react-redux';
import { setDonHang } from '../../../redux/donhangSlice';
const DonHang = () => {
  const dispatch = useDispatch();
  const DonHang = useSelector((state) => state.donhang.donhang);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null); // To store the selected bill data
  const [filterState, setFilterState] = useState(null); 
  const itemsPerPage = 10;

  const fetchDonHang = useCallback(() => {
    fetch("http://localhost:4000/donhang/")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDonHang(data)); // dispatch action to set donhang in Redux store
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  useEffect(() => {
    fetchDonHang();
  }, [fetchDonHang]);

  const dispatchdata = async () => {
    fetchDonHang();
  };

  const handleView = (bill) => {
    setSelectedBill(bill); // Set the selected bill data
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let filteredDonHang = DonHang;
  if (filterState !== null) {
    filteredDonHang = DonHang.filter(bill => bill.tinh_trang === parseInt(filterState));
  }
  const currentUsers = filteredDonHang.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Chưa cập nhật";
    const vietnamTime = new Date(dateTimeString).toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    return vietnamTime;
  };

  return (
    <div id="container-main-admin">
      <Xem
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        selectedBill={selectedBill} // Pass selected bill data to the Xem component
        dispatchdata={dispatchdata}
      />
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> Quản lí đơn hàng</h1>
        </div>
        <div className="nav-right-admin">
          {/* <button onClick={OpenAdd}> Thêm mới <i className="material-icons">add_circle</i> </button> */}
          <select onChange={handleFilterChange}>
            <option value="">Tất cả trạng thái</option>
            <option value="1">Chờ xử lý</option>
            <option value="2">Đã tiếp nhận</option>
            <option value="3">Hoàn thành</option>
            <option value="4">Đơn hàng bị hủy</option>
          </select>
        </div>
      </div>
      <div className="admin-content-component">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Người đặt</th>
              <th>Số điện thoại</th>
              <th>Ngày đặt</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((bill) => (
              <tr key={bill.id_donhang}>
                <td>{bill.id_donhang}</td>
                <td>{bill.hoten}</td>
                <td>{bill.sdt}</td>
                <td>{formatDateTime(bill.ngay_dat)}</td>
                <td>
                  {bill.stt_pay === 1
                    ? "Chưa thanh toán"
                    : bill.stt_pay === 2
                    ? "Đã thanh toán"
                    : "Trạng thái không xác định"}
                </td>
                <td>
                {bill.tinh_trang === 1
    ? <span style={{ color: '#4CAF50' }}>Chờ xử lý</span>
    : bill.tinh_trang === 2
    ? <span style={{ color: '#2196F3' }}>Đã tiếp nhận</span>
    : bill.tinh_trang === 3
    ? <span style={{ color: '#8BC34A' }}>Hoàn thành</span>
    : bill.tinh_trang === 4
    ? <span style={{ color: '#F44336' }}>Đơn hàng bị hủy</span>
    : <span>Trạng thái không xác định</span>
}

                </td>
                <td>
                  <span onClick={() => handleView(bill)}> <i className="material-icons">visibility</i></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={`page-${index}`} onClick={() => changePage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonHang;

import React, { useState, useEffect } from "react";
import Xem from "./ChiTietDonHang";

const DonHang = () => {
  const [DonHang, setDonHang] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null); // To store the selected bill data
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:4000/donhang/")
      .then((response) => response.json())
      .then((data) => {
        setDonHang(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleView = (bill) => {
    setSelectedBill(bill); // Set the selected bill data
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = DonHang.slice(indexOfFirstItem, indexOfLastItem);

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
      />
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> Quản lí đơn hàng</h1>
        </div>
        <div className="nav-right-admin">
          {/* <button onClick={OpenAdd}> Thêm mới <i className="material-icons">add_circle</i> </button> */}
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
                    ? "Chờ xử lý"
                    : bill.tinh_trang === 2
                    ? "Đã tiếp nhận"
                    : bill.tinh_trang === 3
                    ? "Hoàn thành"
                    : bill.tinh_trang === 4
                    ? "Đơn hàng bị hủy"
                    : "Trạng thái không xác định"}
                </td>
                <td>
                  <span onClick={() => handleView(bill)}>Xét duyệt</span>
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

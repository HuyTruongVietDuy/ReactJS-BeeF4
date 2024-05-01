import React, { useState, useEffect, useCallback } from "react";
import Xem from "./ChiTietDonHang";
import SuaDonHang from "./Sua";
import { useSelector, useDispatch } from 'react-redux';
import { setDonHang } from '../../../redux/donhangSlice';
const DonHang = () => {
  const dispatch = useDispatch();
  const DonHang = useSelector((state) => state.donhang.donhang);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null); // To store the selected bill data
  const [filterState, setFilterState] = useState(null); 
  const itemsPerPage = 10;

  const fetchDonHang = useCallback(() => {
    fetch("https://api.sqbe.store/donhang/")
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
    console.log("handleView called", bill);
    setSelectedBill(bill);
    setShowViewModal(true);
  };
  

  const closeViewModal = () => {
    setShowViewModal(false);
  };

  const handleEdit = (bill) => {
    setSelectedBill(bill); // Lưu đơn hàng đang được chỉnh sửa
    setShowEditModal(true); // Mở modal
    
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let filteredDonHang = Array.isArray(DonHang) ? DonHang : [];
  if (filterState !== null && Array.isArray(DonHang)) {
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
  showViewModal={showViewModal} // Truyền showEditModal vào dưới dạng showViewModal
  closeViewModal={closeViewModal}
  selectedBill={selectedBill}
  dispatchdata={dispatchdata}
/>
<SuaDonHang
showEditModal={showEditModal} 
closeEditModal={closeEditModal} 
selectedBill={selectedBill} 
donhangID={selectedBill ? selectedBill.id_donhang : null} 
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
            <option value="5">Không thể xử lý</option>
            <option value="6">Giao hàng không thành công</option>
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
  ? <span style={{ color: '#4CAF50' }}>Chờ xử lý</span>  // Màu xanh lá cây, trạng thái chờ xử lý
  : bill.tinh_trang === 2
  ? <span style={{ color: '#2196F3' }}>Đã tiếp nhận</span>  // Màu xanh dương, trạng thái đã tiếp nhận
  : bill.tinh_trang === 3
  ? <span style={{ color: '#8BC34A' }}>Hoàn thành</span>  // Màu xanh lá cây nhạt, trạng thái hoàn thành
  : bill.tinh_trang === 4
  ? <span style={{ color: '#F44336' }}>Đơn hàng bị hủy</span>  // Màu đỏ, trạng thái bị hủy
  : bill.tinh_trang === 5
  ? <span style={{ color: '#FF9800' }}>Không thể xử lý đơn hàng</span>  // Màu cam, không thể xử lý đơn hàng
  : bill.tinh_trang === 6
  ? <span style={{ color: '#FF5722' }}>Giao hàng không thành công</span>  // Màu đỏ đậm, giao hàng không thành công
  : <span>Trạng thái không xác định</span>  // Mặc định, trạng thái không xác định
}


                </td>
                <td>
  <span onClick={() => handleView(bill)}> 
    <i className="material-icons">visibility</i>
  </span>
  <span onClick={() => handleEdit(bill)}> 
    <i className="material-icons">edit</i>
  </span>
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

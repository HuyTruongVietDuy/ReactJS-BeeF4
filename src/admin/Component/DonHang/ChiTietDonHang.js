import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';

const ChiTietDonHang = ({ showEditModal, closeEditModal, selectedBill }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (showEditModal && selectedBill) {
      // Fetch order details when the modal is shown and selectedBill is available
      fetchOrderDetails(selectedBill.id_donhang);
    }
  }, [showEditModal, selectedBill]);

  const fetchOrderDetails = async (id_donhang) => {
    try {
      const response = await fetch(`http://localhost:4000/donhang/listchitietdonhang/${id_donhang}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      console.log(data);
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      message.error('Failed to fetch order details');
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/donhang/update-tinh-trang/${selectedBill.id_donhang}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tinh_trang: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      closeEditModal();
      message.success('Bạn đã cập nhật trạng thai đơn hàng thành công');
      // Refresh order details after updating status
      fetchOrderDetails(selectedBill.id_donhang);
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    }
  };

  const handleConfirm = () => {
    updateStatus(2); // Xác nhận đơn hàng: tinh_trang = 2
  };

  const handleCancel = () => {
    updateStatus(4); // Hủy đơn hàng: tinh_trang = 4
  };

  const handleComplete = () => {
    updateStatus(3); // Hoàn tất đơn hàng: tinh_trang = 3
  };

  // Function to format price in Vietnamese dong
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Chưa cập nhật";
    const vietnamTime = new Date(dateTimeString).toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    return vietnamTime;
  };

  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className="admin-viewbill-content">
          <span id="close" onClick={closeEditModal}>
              x
            </span>
            <h1 id="h1">Thông tin đơn hàng: CM{selectedBill.id_donhang}</h1>
            <div className="viewbill-top">
              <div className="left">
                <h1>Thông tin giao hàng</h1>
                <p>Người đặt: <span> {selectedBill.hoten}</span></p>
                <p>Email: <span> {selectedBill.email} </span></p>
                <p>Số điện thoại: <span> {selectedBill.sdt}</span></p>
                <p>Ngày đặt: <span> {formatDateTime(selectedBill.ngay_dat)}</span></p>
              </div>
              <div className="right">
                <h1>Địa chỉ giao hàng</h1>
                <p>Quốc gia: <span> Việt Nam</span></p>
                <p>Tỉnh: <span> {selectedBill.tinh}</span></p>
                <p>Huyện: <span> {selectedBill.huyen}</span></p>
                <p>Xã: <span> {selectedBill.xa}</span></p>
                <p>Địa chỉ: <span> {selectedBill.diachi}</span></p>
                <p>Ghi chú khách: <span> {selectedBill.Ghi_chu}</span></p>
              </div>
            </div>
            <div className="viewbill-bottom">
              <h1> Chi tiết sản phẩm:</h1>
              <table>
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th>Mã sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails &&
                    orderDetails.map((detail, index) => (
                      <tr key={`${detail.id}-${index}`}>
                        <td id="tl">
                          <div className="box-product">
                            <div className="left">
                              <div className="box-img">
                                <img src={`http://localhost:4000/chitietsanpham/${detail.hinh_anh_1}`} alt={detail.ten_mau} />
                              </div>
                            </div>
                            <div className="right">
                              <p>{detail.ten_sanpham}</p>
                              <p>{detail.ten_mau}</p>
                              <p>{detail.ten_size}</p>
                            </div>
                          </div>
                        </td>
                        <td>PM24{detail.id_donhangchitiet}</td>
                        <td>{formatPrice(detail.gia_ban)}</td> {/* Format price */}
                        <td>{detail.so_luong}</td>
                        <td>{formatPrice(detail.so_luong * detail.gia_ban)}</td> {/* Format total price */}
                      </tr>
                    ))}
                </tbody>
                <p>Tổng Tiền: {formatPrice(selectedBill.total)}</p>
              </table>
            </div>
            <div className='nav-button'>
              <div id='container-button'>
              {selectedBill.tinh_trang === 1 && (
  <>
    <button id="default" onClick={handleCancel}>Hủy</button>
    <button id="primary" onClick={handleConfirm}>Xác Nhận</button>
  </>
)}
{selectedBill.tinh_trang === 2 && (
  <button id="primary" onClick={handleComplete}>Hoàn tất đơn hàng</button>
)}
{selectedBill.tinh_trang === 4 && (
  <p style={{ color: 'red' }}>Đơn hàng đã bị hủy</p>
)}
{selectedBill.tinh_trang === 3 && (
  <p style={{ color: 'green' }}>Đơn hàng đã được xử lý hoàn tất</p>
)}

              </div>
              
              
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChiTietDonHang;

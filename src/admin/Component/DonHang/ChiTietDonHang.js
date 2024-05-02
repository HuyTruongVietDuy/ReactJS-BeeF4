import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';

const ChiTietDonHang = ({ showViewModal, closeViewModal, selectedBill, dispatchdata }) => {
  const [orderDetails, setOrderDetails] = useState(null);


  useEffect(() => {
    if (showViewModal && selectedBill) {
      fetchOrderDetails(selectedBill.id_donhang);
    }
  }, [showViewModal, selectedBill]);

  const fetchOrderDetails = async (id_donhang) => {
    try {
      const response = await fetch(`https://api.sqbe.store/donhang/listchitietdonhang/${id_donhang}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      message.error('Failed to fetch order details');
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`https://api.sqbe.store/donhang/update-tinh-trang/${selectedBill.id_donhang}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tinh_trang: newStatus,
        }),
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        
        if (responseData.message) {
          // Nếu thông báo là "Sản phẩm không đủ hàng", hiển thị cảnh báo
          if (responseData.message.includes("Sản phẩm không đủ hàng")) {
            closeViewModal();
            dispatchdata();
            message.warning("Số lượng sản phẩm không đủ để xác nhận đơn hàng."); // Hiển thị cảnh báo
          } else {
            message.error(responseData.message); // Hiển thị lỗi khác
          }
        } else {
          message.error("Failed to update order status."); // Lỗi chung
        }
      } else {
        closeViewModal(); // Đóng modal nếu thành công
        message.success("Bạn đã cập nhật trạng thái đơn hàng thành công."); // Thông báo thành công
        dispatchdata(); // Cập nhật lại dữ liệu
        fetchOrderDetails(selectedBill.id_donhang); // Tải lại chi tiết đơn hàng
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error("Có lỗi khi cập nhật trạng thái đơn hàng."); // Lỗi chung
      closeViewModal(); // Đóng modal nếu có lỗi
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

  const handleDeliveryFailed = () => {
    updateStatus(6);
  };

  // còn nếu số lượng đơn hàng hết là 5 tinh_trang =5

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
      {showViewModal && (
        <div className="admin-edit">
          <div className="admin-viewbill-content">
            <span id="close" onClick={closeViewModal}>
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
                                <img src={`https://api.sqbe.store/chitietsanpham/${detail.hinh_anh_1}`} alt={detail.ten_mau} />
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
                        <td>{formatPrice(detail.gia_ban)}</td>
                        <td>{detail.so_luong}</td>
                        <td>{formatPrice(detail.gia_ban * detail.so_luong)}</td>
                      </tr>
                    ))}
                </tbody>
               
              </table>
              <p id='total'>Tổng Tiền: {formatPrice(selectedBill.total)}</p>
            </div>
            
            <div className='nav-button'>
              <div id='container-button'>
                {selectedBill.tinh_trang === 1 && (
                  <>
                    <button id="default" onClick={handleCancel}>Hủy xác nhận</button>
                    <button id="primary" onClick={handleConfirm}>Xác Nhận</button>
                  </>
                )}
                {selectedBill.tinh_trang === 2 && (
                  <>
                   <button id="default" onClick={handleDeliveryFailed}>Giao hàng không thành công</button>
                    <button id="primary" onClick={handleComplete}>Hoàn tất đơn hàng</button>
                   
                   
                  </>
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
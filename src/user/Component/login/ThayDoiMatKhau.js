import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { message } from 'antd';

const TaoMatKhau = () => {
  const { id_user } = useParams(); // Lấy id_user từ URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Sử dụng useEffect để theo dõi thời gian và chuyển hướng khi hết hạn
  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển hướng đến trang báo lỗi nếu hết hạn và chưa thành công
      if (!success) {
        <Navigate to="/baoloi" />;
      }
    }, 600000); // Hết hạn sau 10 phút (600000 milliseconds)
    
    // Xóa timer khi component unmount
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau hay không
    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    // Kiểm tra mật khẩu có ít nhất 6 ký tự
    if (newPassword.length < 6) {
      message.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/taikhoan/reset-password/${id_user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: 'your_token', // Thay 'your_token' bằng mã token của bạn
          newPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        // Thông báo thành công
        message.success(data.message);
        // Đặt success thành true để chuyển hướng đến trang đăng nhập
        setSuccess(true);
      } else {
        // Thông báo lỗi từ máy chủ
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div id="container-main">
      {/* Sử dụng Navigate để chuyển hướng sau khi thành công */}
      {success && <Navigate to="/dangnhap" />}
      
      <form className="user-form-dangnhap" onSubmit={handleSubmit}>
        <h1 style={{fontSize:"1.5vw"}}>Tạo mật khẩu mới </h1>
        <input 
          type="password" 
          placeholder="Nhập mật khẩu mới" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Xác nhận lại mật khẩu" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" style={{padding:"15px 20px", borderRadius:'6px'}}>Xác nhận</button> 
      </form>
    </div>
  );
};

export default TaoMatKhau;

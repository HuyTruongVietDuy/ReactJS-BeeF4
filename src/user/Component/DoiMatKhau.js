import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; // Sử dụng Ant Design
import axios from 'axios';

const DoiMatKhau = () => {
  const user = useSelector((state) => state.auth.user); // Lấy thông tin người dùng từ Redux store
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false); // Biến để điều khiển trạng thái loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
        message.error('Mật khẩu mới và xác nhận không khớp');
        return;
    }

    setLoading(true); // Bắt đầu trạng thái loading

    try {
        const response = await axios.post(
          `https://api.sqbe.store/taikhoan/change-password/${user.id_user}`, 
          {
            oldPassword,
            newPassword,
            confirmNewPassword
          }
        );

        message.success('Đổi mật khẩu thành công');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');

    } catch (err) {
        message.error(err.response?.data?.message || 'Lỗi khi thay đổi mật khẩu');
    } finally {
        setLoading(false); // Kết thúc trạng thái loading
    }
};

  return (
    <div id='container-main'>
      <form className="user-form-dangky" onSubmit={handleSubmit}>
        <h1 style={{ fontSize: '1.4vw' }}>Thay đổi mật khẩu</h1>
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Cập nhật mật khẩu</button>
      </form>
    </div>
  );
};

export default DoiMatKhau;

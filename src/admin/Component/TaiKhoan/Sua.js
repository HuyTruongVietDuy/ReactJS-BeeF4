import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {  useSelector } from 'react-redux';

// Hàm kiểm tra định dạng email hợp lệ
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email); // Trả về true nếu email hợp lệ
};

// Hàm kiểm tra số điện thoại Việt Nam hợp lệ
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/; // Mã vùng Việt Nam + 8 chữ số
  return phoneRegex.test(phone); // Trả về true nếu số điện thoại hợp lệ
};

const Sua = ({ showEditModal, closeEditModal, selectedUser, fetchUsers }) => {
  const [role, setRole] = useState(''); // State cho role
  const [ho_ten, setName] = useState(''); // State cho tên
  const [email, setEmail] = 

useState(''); // State cho email
  const [sdt, setSdt] = useState(''); // State cho số điện thoại
  const user = useSelector((state) => state.auth.user); // Lấy thông tin người dùng hiện tại
  
  // Cập nhật state khi selectedUser thay đổi
  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role || '');
      setName(selectedUser.ho_ten || '');
      setEmail(selectedUser.email || '');
      setSdt(selectedUser.sdt || '');
    }
  }, [selectedUser]);

  // Xử lý sự kiện thay đổi vai trò
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Xử lý sự kiện thay đổi tên
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Xử lý sự kiện thay đổi email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Xử lý sự kiện thay đổi số điện thoại
  const handleSdtChange = (e) => {
    setSdt(e.target.value);
  };

  // Xử lý gửi dữ liệu cập nhật thông tin người dùng
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    
    if (!isValidEmail(email)) { // Kiểm tra email hợp lệ
      message.error("Email không hợp lệ. Vui lòng kiểm tra lại.");
      return; // Ngừng xử lý nếu email không hợp lệ
    }

    if (!isValidPhoneNumber(sdt)) { // Kiểm tra số điện thoại hợp lệ
      message.error("Số điện thoại không hợp lệ. Phải là số điện thoại Việt Nam.");
      return; // Ngừng xử lý nếu số điện thoại không hợp lệ
    }
    const updatedUser = {
      id_user: selectedUser.id_user, // ID của người dùng cần cập nhật
      role,
      ho_ten,
      email,
      sdt,
    };

    try {
      const response = await fetch(`https://api.sqbe.store/taikhoan/updateNguoiDung/${selectedUser.id_user}`, {
        method: 'PUT', // Sử dụng PUT hoặc PATCH
        headers: {
          'Content-Type': 'application/json', // Xác định định dạng dữ liệu
        },
        body: JSON.stringify(updatedUser), // Chuyển đổi dữ liệu thành JSON
      });

      if (!response.ok) {
        throw new Error('Failed to update user'); // Nếu thất bại, báo lỗi
      }

      message.success('Cập nhật thành công !!'); // Thông báo thành công
      fetchUsers();
      closeEditModal(); // Đóng modal sau khi cập nhật
    } catch (error) {
      message.error('Error updating user information'); // Thông báo lỗi
    }
  };

  const isCurrentUser = user?.id_user === selectedUser?.id_user;

  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className="admin-edit-content">
            <span id="close" onClick={closeEditModal}>x</span>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} className="form-admin-edit" id='form-admin' style={{padding:'0'}}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={ho_ten}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="sdt">Phone Number</label>
                <input
                  type="text"
                  id="sdt"
                  value={sdt}
                  onChange={handleSdtChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {!isCurrentUser && (
                <div>
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    value={role}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="3">Admin</option>
                    <option value="2">nhân viên</option>
                    <option value="1">Khách hàng</option>
                  </select>
                </div>
              )}
              <input type="submit" value="Submit" /> {/* Nút lưu thay đổi */}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sua;

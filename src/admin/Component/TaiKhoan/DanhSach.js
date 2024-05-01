import React, { useState, useEffect, useCallback } from 'react';
import Sua from "./Sua";
import { useSelector, useDispatch } from "react-redux";
const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(() => {
    fetch('https://api.sqbe.store/taikhoan/listtaikhoan')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data); // Cập nhật danh sách người dùng
        setTotalPages(Math.ceil(data.length / itemsPerPage)); // Cập nhật tổng số trang
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [itemsPerPage]); // Chỉ tái tạo khi itemsPerPage thay đổi

  useEffect(() => {
    fetchUsers(); // Gọi hàm fetchUsers
  }, [fetchUsers]); // Chỉ tái tạo khi fetchUsers thay đổi

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Chưa cập nhật';
    const vietnamTime = new Date(dateTimeString).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    return vietnamTime;
  };

  const handleEdit = (user) => {
    setShowEditModal(true);
    setSelectedUser(user);
    setSelectedUserId(user.id_user)
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };
  return (
    <div id="container-main-admin">
      <Sua
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        selectedUserId={selectedUserId}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
      />
      <div id="container-nav-admin">
        <div className='nav-left-admin'>
          <h1> Quản lí tài khoản</h1>
        </div>
        <div className='nav-right-admin'>
          {/* <button onClick={OpenAdd}> Thêm mới <i className="material-icons">add_circle</i> </button> */}
        </div>
      </div>
      <div className='admin-content-component'>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Giới tính</th>
              <th>Login in</th>
              <th>Role</th>
              <th>Action</th>
              {/* Thêm các cột khác tương ứng với dữ liệu người dùng */}
            </tr>
          </thead>
          <tbody>
  {currentUsers.map((user) => (
    <tr key={user.id_user}>
      <td>{user.id_user}</td>
      <td>{user.ho_ten}</td>
      <td>{user.email}</td>
      <td>{user.sdt}</td>
      <td>{user.gioi_tinh}</td>
      <td>{formatDateTime(user.login_in)}</td>
      <td>
        {user.role === 1 && <span className="customer">Khách hàng</span>}
        {user.role === 2 && <span className="employee">Nhân viên</span>}
        {user.role === 3 && <span className="admin">Admin</span>}
      </td>
      <td><button id='button-sua'  onClick={() => handleEdit(user)}>Edit</button></td>
    </tr>
  ))}
</tbody>


        </table>
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => changePage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListUser;

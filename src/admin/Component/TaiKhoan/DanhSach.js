import React, { useState, useEffect } from 'react';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:4000/taikhoan/listtaikhoan')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
  return (
    <div id="container-main-admin">
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

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thoat } from '../../redux/authSlice.js';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditUs = () => {
  const user = useSelector((state) => state.auth.user); // Lấy id_user từ Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tenTaiKhoan, setTenTaiKhoan] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [tinh, setTinh] = useState('');
  const [huyen, setHuyen] = useState('');
  const [xa, setXa] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');

  // Hàm để tải thông tin người dùng khi component được mount
  useEffect(() => {
    if (user && user.id_user) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`https://api.sqbe.store/taikhoan/user/${user.id_user}`);
          
          if (response.status === 200) {
            const userData = response.data;

            // Cập nhật trạng thái với dữ liệu từ API
            setTenTaiKhoan(userData.ho_ten || '');
            setDiaChi(userData.diachi || '');
            setTinh(userData.tinh || '');
            setHuyen(userData.huyen || '');
            setXa(userData.xa || '');
            setSoDienThoai(userData.sdt || '');
          } else {
            message.error('Không thể tải thông tin người dùng');
          }
        } catch (error) {
          console.error('Lỗi khi tải thông tin người dùng:', error);
          message.error('Có lỗi xảy ra khi tải thông tin người dùng');
        }
      };

      fetchUserInfo(); // Gọi hàm để tải thông tin người dùng
    }
  }, [user]); // Chỉ chạy khi `user` thay đổi

  const handleLogout = () => {
    dispatch(thoat());
    message.success('Đăng xuất thành công');
    navigate('/dangnhap'); // Điều hướng đến trang đăng nhập
    window.location.reload(); // Làm mới trang
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Ngăn việc tải lại trang
    
    try {
      const response = await axios.patch(`https://api.sqbe.store/taikhoan/update-user/${user.id_user}`, {
        ho_ten: tenTaiKhoan,
        diachi: diaChi,
        tinh: tinh,
        huyen: huyen,
        xa: xa,
        sdt: soDienThoai
      });

      if (response.status === 200) {
        message.success('Cập nhật thành công');
      } else {
        message.error('Cập nhật thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
      message.error('Có lỗi xảy ra khi cập nhật');
    }
  };

  return (
    <div id="container-main">
      <div className="container-user-detail">
        <div className="content">
          <div className="box-1">
            <h2>SỬA THÔNG TIN</h2>
            <form onSubmit={handleUpdateUser}>
              <input 
                type="text" 
                placeholder="Tên tài khoản" 
                value={tenTaiKhoan} 
                onChange={(e) => setTenTaiKhoan(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Địa chỉ" 
                value={diaChi} 
                onChange={(e) => setDiaChi(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Tỉnh" 
                value={tinh} 
                onChange={(e) => setTinh(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Huyện" 
                value={huyen} 
                onChange={(e) => setHuyen(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Xã" 
                value={xa} 
                onChange={(e) => setXa(e.target.value)} 
              />
              <input 
                type='text'
                placeholder="Số điện thoại"
                value={soDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
              />
              <button type="submit">Sửa</button>
            </form>
          </div>
          
          <div className="box-2">
            <p>Tài khoản của tôi</p>
            <p>Tên tài khoản: <span>{tenTaiKhoan}</span></p>
            <p>Địa chỉ: <span>{diaChi}</span></p>
            <p>Thành phố: <span>{tinh}</span></p>
            <p>Quốc gia: <span>Vietnam</span></p>
            <p>Số điện thoại: <span>{soDienThoai}</span></p>
            <button style={{ margin: "10px 0" }}>
              {user && user.id_user && 
                <Link to={`/suauser/${user.id_user}`}>Thêm/Sửa địa chỉ</Link>
              }
            </button>
            <button style={{margin:"10px 0"}}>
            {user && user.id_user &&
                <Link to={`/thaydoimatkhau`}>Thay đổi mật khẩu</Link>
            }
        </button>
            <button onClick={handleLogout}>Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUs;

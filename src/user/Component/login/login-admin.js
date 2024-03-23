import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dalogin } from '../../../redux/authSlice';
import { Navigate } from 'react-router-dom'; // Import Navigate
const DangNhapAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const dispatch = useDispatch(); // Lấy hàm dispatch từ react-redux

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/taikhoan/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ten_dangnhap: email, matkhau: password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Gửi dữ liệu đăng nhập đến Redux store
        dispatch(dalogin(data));
        console.log('Login successful!');
        // Set login status
        setLoggedIn(true);
      } else if (response.status === 401) {
        setError('Tài khoản hoặc mật khẩu không chính xác');
      } else {
        setError('Đã xảy ra lỗi khi đăng nhập');
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      setError('Đã xảy ra lỗi khi đăng nhập');
    }
  };

  // Redirect if logged in
  if (loggedIn) {
    return <Navigate to="/admin/" />; // Use Navigate instead of Redirect
  }

  return (
    <div className="container-login-admin">
      <div className="content">
        <div className="content__form">
          <h1>Đăng nhập</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="box-form">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="box-form">
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-btn">Đăng nhập</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <div className="content__image"></div>
      </div>
    </div>
  );
};

export default DangNhapAdmin;

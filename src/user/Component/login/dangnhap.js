import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dalogin } from '../../../redux/authSlice';
import { message } from 'antd';

const DangNhap = () => {
  const inputRef = useRef(null); // Updated to a single ref for flexibility
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const input = inputRef.current.value; // Accepts both email and username
    const password = passwordRef.current.value;

    try {
      const response = await fetch('https://api.sqbe.store/taikhoan/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ten_dangnhap: input, matkhau: password }), // Single input for both email and username
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(dalogin(data));
        setLoggedIn(true);

        message.success('Đăng nhập thành công');
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

  if (loggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <div id="container-main">
      <form onSubmit={handleSubmit} className="user-form-dangnhap">
        <h3>ĐĂNG NHẬP</h3>
        <input type="text" placeholder="Email hoặc Tên đăng nhập" ref={inputRef} /> {/* Updated placeholder */}
        <input type="password" placeholder="Password" ref={passwordRef} />
        <div className="box" style={{ marginBottom: "30px" }}>
          <button type="submit">ĐĂNG NHẬP</button>
          <p>
            <a href="/quenmatkhau">Quên mật khẩu?</a>
            <br />
            <span>hoặc</span>
            <Link to="/dangky">Đăng ký</Link>
          </p>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      </form>
    </div>
  );
};

export default DangNhap;

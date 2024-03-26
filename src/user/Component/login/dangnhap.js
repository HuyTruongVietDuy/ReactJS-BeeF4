import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import { useDispatch } from 'react-redux';
import { dalogin } from '../../../redux/authSlice';
import { message } from 'antd';

const DangNhap = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [error, setError] = useState(''); // State to store error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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
        dispatch(dalogin(data));
        console.log('Login successful!');
        console.log('Authentication data:', data);

        // Display success message
        message.success('Đăng nhập thành công');

        // Update login status
        setLoggedIn(true);

      } else if (response.status === 401) {
        setError('Tài khoản hoặc mật khẩu không chính xác'); // Set error message
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
    return <Navigate to="/user" />; // Use Navigate instead of Redirect
  }

  return (
    <div id="container-main">
      <form onSubmit={handleSubmit} className="user-form-dangnhap">
        <h3 className="">ĐĂNG NHẬP</h3>
       
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <div className="box" style={{marginBottom:"30px"}}>
          <button type="submit">ĐĂNG NHẬP</button>
          <p>
            <a href="/quenmatkhau">Quên mật khẩu?</a> <br />
            <span>hoặc</span>
            <Link to="/dangky">Đăng ký</Link>
          </p>
        </div>
        
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      </form>

      <div className="title-new-product" style={{ marginTop: '150px' }}>
        <div className="scroll-wrapper">
          <div className="scroll-text">Login Account</div>
          <div className="scroll-text">Login Account</div>
          <div className="scroll-text">Login Account</div>
          <div className="scroll-text">Login Account</div>
          <div className="scroll-text">Login Asccount</div>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;

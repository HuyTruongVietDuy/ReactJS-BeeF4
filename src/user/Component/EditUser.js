import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { thoat } from "../../redux/authSlice.js";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from "react-router-dom";
const EditUs = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use navigate to navigate programmatically
  

    

    const handleLogout = () => {
        dispatch(thoat());
        message.success('Đăng xuất thành công');
        navigate('/dangnhap'); // Redirect to "/dangnhap"
        window.location.reload();
    };

   
    return (
        <div id="container-main">
            <div className="container-user-detail">
                <div className="content">
                    <div className="box-1">
                    <h2>SỬA THÔNG TIN</h2>
                    <form action="">
                 
                    <input type="text" placeholder="Tên tài khoản"/>
            <input type="text" placeholder="Địa chỉ"/>
            <input type="text" placeholder="Quốc gia"/>
            <input type="text" placeholder="Số điện thoại"/>
            <button>Sửa</button>
                    </form>
                    </div>

                    <div className="box-2">
                        <p>Tài khoản của tôi</p>
                        <p>Tên tài khoản: <span>{user ? user.ho_ten : ''}</span></p>
                        <p>Địa chỉ: <span>{user ? user.diachi : ''}</span></p>
                        <p>Thành Phố: <span>{user ? user.tinh : ''}</span></p>
                        <p>Quốc gia: <span>Vietnam</span></p>
                        <p>Số điện thoại: <span>{user ? user.sdt : ''}</span></p>
                        <button style={{margin:"10px 0"}}>
            {user && user.id_user &&
                <Link to={`/suauser/${user.id_user}`}>Thêm/Sửa địa chỉ</Link>
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

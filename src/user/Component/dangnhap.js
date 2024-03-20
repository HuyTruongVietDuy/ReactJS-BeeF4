import React from 'react';
import { Link } from 'react-router-dom';
   
const dangnhap = () => {
  

  return (
    <div id="container-main">
    <form action="" className="user-form-dangnhap">
    <h3 className="">ĐĂNG NHẬP</h3>
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Password" />
    <div className="box">
      <button>ĐĂNG NHẬP</button>
      <p>
        <a href="/quenmatkhau">Quên mật khẩu?</a> <br />
        <span>hoặc</span>
        <Link to="/dangky">Đăng ký</Link>
      </p>
    </div>
  </form>

  <div className="title-new-product" style={{marginTop:'150px'}}>
      <div className="scroll-wrapper">
        <div className="scroll-text" >Login Account</div>
        <div className="scroll-text" >Login Account</div>
        <div className="scroll-text" >Login Account</div>
        <div className="scroll-text" >Login Account</div>
        <div className="scroll-text" >Login Asccount</div>
      </div>
    </div>
    </div>
  );
};

export default dangnhap;

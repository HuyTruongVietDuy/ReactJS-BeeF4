import React from 'react';
import { Link } from 'react-router-dom';

const dangky = () => {
  

  return (
    <div id="container-main">
    <form action="" className="user-form-dangky">
    <h3 className="">ĐĂNG KÝ</h3>
    <input type="text" placeholder="Họ" />
    <input type="text" placeholder="Tên" />
    <label htmlFor="nam"
      ><input type="radio" name="radio" id="nam" /> Nam</label
    >
    <label htmlFor="nu"><input type="radio" name="radio" id="nu" /> Nữ</label>
    <input type="text" placeholder="mm/dd/yy" />
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Mật khẩu" />
    <button>ĐĂNG KÝ</button>
    <div className="return">
    <Link to="/"><sub><i className="material-icons">arrow_back</i></sub> Quay lại trang chủ</Link>
    </div>
  </form>
    </div>
  );
};

export default dangky;

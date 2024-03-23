import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const DangKy = () => {
  const hoTenRef = useRef(null);
  const tenDangNhapRef = useRef(null);
  const emailRef = useRef(null);
  const matKhauRef = useRef(null);
  const gioiTinhNamRef = useRef(null);
  const gioiTinhNuRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện gửi form mặc định

    // Lấy giá trị từ các trường nhập liệu sử dụng refs
    const ho_ten = hoTenRef.current.value;
    const ten_dangnhap = tenDangNhapRef.current.value;
    const email = emailRef.current.value;
    const matkhau = matKhauRef.current.value;
    const gioi_tinh  = gioiTinhNamRef.current.checked ? 'Nam' : 'Nữ';

    // Gửi yêu cầu POST tới API
    try {
      const response = await fetch('http://localhost:4000/taikhoan/dangky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ho_ten,
          ten_dangnhap,
          email,
          matkhau,
          gioi_tinh,
        }),
      });

      if (response.ok) {
        // Xử lý khi đăng ký thành công
        console.log('Đăng ký thành công!');
      } else {
        // Xử lý khi có lỗi từ phía server
        console.error('Đăng ký thất bại.');
      }
    } catch (error) {
      // Xử lý khi có lỗi trong quá trình gửi yêu cầu
      console.error('Đã xảy ra lỗi:', error);
    }
  };

  return (
    <div id="container-main">
      <form onSubmit={handleSubmit} className="user-form-dangky">
        <h3 className="">ĐĂNG KÝ</h3>
        <input type="text" placeholder="Họ tên" ref={hoTenRef} />
        <input type="text" placeholder="Tên đăng nhập" ref={tenDangNhapRef} />
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Mật khẩu" ref={matKhauRef} />
        <label htmlFor="nam"><input type="radio" name="gioiTinh" id="nam" ref={gioiTinhNamRef} defaultChecked /> Nam</label>
        <label htmlFor="nu"><input type="radio" name="gioiTinh" id="nu" ref={gioiTinhNuRef} /> Nữ</label> <br/> <br/>
   
        <button type="submit">ĐĂNG KÝ</button>
        <div className="return">
          <Link to="/"><sub><i className="material-icons">arrow_back</i></sub> Quay lại trang chủ</Link>
        </div>
      </form>
    </div>
  );
};

export default DangKy;

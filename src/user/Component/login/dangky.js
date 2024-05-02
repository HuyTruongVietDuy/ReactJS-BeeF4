import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const DangKy = () => {
  const hoTenRef = useRef(null);
  const tenDangNhapRef = useRef(null);
  const emailRef = useRef(null);
  const matKhauRef = useRef(null);
  const gioiTinhNamRef = useRef(null);
  const gioiTinhNuRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện gửi form mặc định

    // Lấy giá trị từ các trường nhập liệu
    const ho_ten = hoTenRef.current.value.trim();
    const ten_dangnhap = tenDangNhapRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const matkhau = matKhauRef.current.value.trim();
    const gioi_tinh = gioiTinhNamRef.current.checked ? 'Nam' : 'Nữ';

    // Kiểm tra các trường bắt buộc
    if (!ho_ten || !ten_dangnhap || !email || !matkhau) {
      message.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      message.error('Email không hợp lệ.');
      return;
    }
    if (matkhau.length < 6) {
      message.error('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    // Gửi yêu cầu POST tới API
    try {
      const response = await fetch('https://api.sqbe.store/taikhoan/dangky', {
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
        // Khi đăng ký thành công
        console.log('Đăng ký thành công!');
        navigate('/dangnhap'); // Điều hướng tới trang đăng nhập
        message.success('Đăng ký thành công!');
      } else {
        // Khi đăng ký thất bại
        const result = await response.json(); // Nhận dữ liệu từ phản hồi
        console.error('Đăng ký thất bại:', result);
        
        // Xử lý thông điệp lỗi từ phía máy chủ
        if (result.thông_báo) {
          message.error(result.thông_báo); // Thông báo cụ thể từ máy chủ
        } else {
          message.error('Đăng ký thất bại!');
        }
      }
    } catch (error) {
      // Xử lý khi có lỗi trong quá trình gửi yêu cầu
      console.error('Đã xảy ra lỗi:', error);
      message.error('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
  };

  return (
    <div id="container-main">
      <form onSubmit={handleSubmit} className="user-form-dangky">
        <h3>ĐĂNG KÝ</h3>
        <input type="text" placeholder="Họ tên" ref={hoTenRef} />
        <input type="text" placeholder="Tên đăng nhập" ref={tenDangNhapRef} />
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Mật khẩu" ref={matKhauRef} />
        <label htmlFor="nam"><input type="radio" name="gioiTinh" id="nam" ref={gioiTinhNamRef} defaultChecked /> Nam</label>
        <label htmlFor="nu"><input type="radio" name="gioiTinh" id="nu" ref={gioiTinhNuRef} /> Nữ</label>
        <br /><br />

        <button type="submit">ĐĂNG KÝ</button>
        <div className="return">
          <Link to="/"><i className="material-icons">arrow_back</i> <sup>Quay lại trang chủ</sup></Link>
        </div>
      </form>
    </div>
  );
};

export default DangKy;

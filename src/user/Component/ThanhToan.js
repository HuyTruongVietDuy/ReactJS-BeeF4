import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import {  useSelector } from "react-redux";
import { message} from "antd";
function ThanhToan(){
  const cart = useSelector((state) => state.cart.listSP);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const emailRef = useRef(null);
  const hotenRef = useRef(null);
  const sdtRef = useRef(null);
  const diachiRef = useRef(null);
  const ghichuRef = useRef(null);
  const tinhRef = useRef(null);
const huyenRef = useRef(null);
const xaRef = useRef(null);
  useEffect(() => {
    fetch("http://localhost:4000/donhang/data")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
        setLoadingProvinces(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu tỉnh thành:", error);
        setLoadingProvinces(false);
      });
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    const selectedProvinceData = provinces.find((province) => province[1] === selectedProvince);

    if (selectedProvinceData && selectedProvinceData.length > 4) {
      setDistricts(selectedProvinceData[4]);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const selectedDistrictData = districts.find((district) => district[1] === selectedDistrict);

    if (selectedDistrictData && selectedDistrictData.length > 4) {
      setWards(selectedDistrictData[4]);
    } else {
      setWards([]);
    }
  };
  const submitData = () => {
    // Lấy giá trị của các trường từ các ref
    const emailValue = emailRef.current.value;
    const hotenValue = hotenRef.current.value;
    const sdtValue = sdtRef.current.value;
    const diachiValue = diachiRef.current.value;
    const tinhValue = tinhRef.current.value;
    const huyenValue = huyenRef.current.value;
    const xaValue = xaRef.current.value;
    const ghichuValue = ghichuRef.current.value;
  
    // Kiểm tra các trường bắt buộc và hiển thị cảnh báo nếu cần
    if (!emailValue || !hotenValue || !sdtValue || !diachiValue || !tinhValue || !huyenValue || !xaValue) {
      message.warning('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
  
    // Kiểm tra định dạng email
    if (!isValidEmail(emailValue)) {
      message.warning('Địa chỉ email không hợp lệ');
      return;
    }
  
    // Kiểm tra định dạng số điện thoại
    if (!isValidPhoneNumber(sdtValue)) {
      message.warning('Số điện thoại không hợp lệ');
      return;
    }
  
    // Tạo object chứa thông tin đơn hàng
    const orderData = {
      email: emailValue,
      hoten: hotenValue,
      sdt: sdtValue,
      diachi: diachiValue,
      tinh: tinhValue,
      huyen: huyenValue,
      xa: xaValue,
      ghi_chu: ghichuValue,
      // Các dữ liệu khác (nếu cần)
    };
  
    // Gửi dữ liệu đơn hàng đến backend
    fetch("http://localhost:4000/donhang/luudonhang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      message.success('Lưu đơn hàng thành công');
      console.log("Order submitted successfully:", data);
      // Xử lý phản hồi thành công từ máy chủ
      // Theo ý muốn, thực hiện bất kỳ hành động nào khác sau khi gửi thành công
    })
    .catch((error) => {
      console.error("Error submitting order:", error);
      message.error('Lưu đơn hàng thất bại');
      // Xử lý lỗi
    });
  };
  
  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    // Bạn có thể thực hiện kiểm tra định dạng email ở đây
    return /\S+@\S+\.\S+/.test(email);
  };
  
  // Hàm kiểm tra định dạng số điện thoại
  const isValidPhoneNumber = (phoneNumber) => {
    // Bạn có thể thực hiện kiểm tra định dạng số điện thoại ở đây
    return /^\d{10,11}$/.test(phoneNumber);
  };
  
  
  return (
    <div className="container-thanhtoan">
      <article>
        <div className="content-article">
          <div className="content-left">
            <div className="logo-content">
             <Link to='/'> <img src="./images/SQBE Logo.png" alt=""/></Link>
            </div>
            <form>
              <h1>Thông tin nhận hàng</h1>
              <div className="input-container">
            <input type="text" ref={emailRef} className="input-field" required />
            <label htmlFor="email" className="input-label">
              Email
            </label>
          </div>
          <div className="input-container">
            <input type="text" ref={hotenRef} className="input-field" required />
            <label htmlFor="hoten" className="input-label">
              Họ và tên
            </label>
          </div>
          <div className="input-container">
            <input type="text" ref={sdtRef} className="input-field" required />
            <label htmlFor="sdt" className="input-label">
              Số điện thoại
            </label>
          </div>
          <div className="input-container">
            <input type="text" ref={diachiRef} className="input-field" required />
            <label htmlFor="diachi" className="input-label">
              Địa chỉ
            </label>
          </div>
              <div className="input-container">
                <select id="province" className="input-field" onChange={handleProvinceChange} required ref={tinhRef}>
                <option value="" defaultValue></option>

                  {loadingProvinces ? (
                    <option>Đang tải...</option>
                  ) : (
                    
                    provinces.map((province) => (
                      <option key={province[0]} value={province[1]}>
                        {province[1]}
                      </option>
                    ))
                  )}
                </select>
                <label htmlFor="province" className="input-label">
                  Chọn tỉnh thành
                </label>
              </div>
              <div className="input-container">
                <select id="district" className="input-field" onChange={handleDistrictChange} required ref={huyenRef}>
                <option value="" defaultValue></option>
                  {loadingDistricts ? (
                    <option>Đang tải...</option>
                  ) : (
                    districts.map((district) => (
                      <option key={district[0]} value={district[1]}>
                        {district[1]}
                      </option>
                    ))
                  )}
                </select>
                <label htmlFor="district" className="input-label">
                  Chọn quận huyện
                </label>
              </div>
              <div className="input-container">
                <select id="ward" className="input-field" required  ref={xaRef}>
                <option value="" defaultValue></option>
                  {loadingWards ? (
                    <option>Đang tải...</option>
                  ) : (
                    wards.map((ward) => (
                      <option key={ward[0]} value={ward[1]}>
                        {ward[1]}
                      </option>
                    ))
                  )}
                </select>
                <label htmlFor="ward" className="input-label">
                  Chọn xã, phường
                </label>
              </div>
              <div className="input-container">
            <textarea type="text" ref={ghichuRef} className="textarea-field" required />
            <label htmlFor="ghichu" className="input-label">
              Ghi chú
            </label>
          </div>
            </form>
          </div>
          <div className="content-right">
            <div className="container-box">
              <div className="box-vanchuyen">
                <h1>Vận chuyển</h1>
                <div className="box-title">Vui lòng nhập thông tin giao hàng</div>
              </div>
              <div className="box-thanhtoan">
                <h1>Thanh toán</h1>
                <table>
                  <tbody>
                    <tr>
                      <td> <input type="radio" name="payment_method" checked/>Thanh toán qua VNPAY-QR</td>
                    </tr>
                    <tr>
                      <td> <input type="radio" name="payment_method"/>Thanh toán khi giao hàng (COD)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </article>
      <aside>
        <div className="aside-content">
          <div className="aside__top">
            <h1>Đơn hàng ( 1 sản phẩm )</h1>
          </div>
          <div className="aside__cart">
          {cart.map((product, index) => (
          <table>
          
          <tr key={index}>
    <td rowspan="2" id="img"><img src={`http://localhost:4000/chitietsanpham/${product.hinh_anh_1}`} alt={product.ten_sanpham} />
    <span id='count'>{product.soluong}</span>
    </td>
    <td id='name'>{product.ten_sanpham}</td>
    <td rowspan="2" id='price'>{product.gia * product.soluong}</td>
  </tr>
  <tr>
    <td  id='size'>{product.ten_size}</td>
  </tr>
       
</table>
           ))}
          </div>
          <div className="aside__discount">
            <table>
              <tr>
                <td><input placeholder="Nhập mã giảm giá"/></td>
                <td> <button>Áp dụng</button></td>
              </tr>
            </table>
          </div>
          <div className="aside__total">
            <table>
              <tr>
                <td id='total__text'>Tổng Cộng</td>
                <td id='total__price'>400.000đ</td>
              </tr>
              <tr>
                <Link to='/viewcart'><td id='total__back'>quay về giỏ hàng</td></Link>
                <td id='total__dathang'><button onClick={submitData}>Đặt hàng</button></td>
              </tr>
            </table>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ThanhToan;

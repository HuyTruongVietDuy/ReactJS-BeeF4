import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { XoaTatCaSP } from "../../redux/cartSlice";
import { message } from "antd";
function ThanhToan() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Khởi tạo giá trị mặc định là COD

  const emailRef = useRef(null);
  const hotenRef = useRef(null);
  const sdtRef = useRef(null);
  const diachiRef = useRef(null);
  const ghichuRef = useRef(null);
  const tinhRef = useRef(null);
  const huyenRef = useRef(null);
  const xaRef = useRef(null);

  // Function to calculate the total price of all items in the cart
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total +=
        product.gia_khuyenmai && product.gia_khuyenmai !== 0
          ? product.gia_khuyenmai * product.soluong
          : product.gia * product.soluong;
    });
    return total;
  };
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
    const selectedProvinceData = provinces.find(
      (province) => province[1] === selectedProvince
    );

    if (selectedProvinceData && selectedProvinceData.length > 4) {
      setDistricts(selectedProvinceData[4]);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const selectedDistrictData = districts.find(
      (district) => district[1] === selectedDistrict
    );

    if (selectedDistrictData && selectedDistrictData.length > 4) {
      setWards(selectedDistrictData[4]);
    } else {
      setWards([]);
    }
  };
  const submitData = () => {
    if (cart.length === 0) {
      message.error(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng."
      );
      return;
    }
    // Lấy giá trị của các trường từ các ref
    const emailValue = emailRef.current.value;
    const hotenValue = hotenRef.current.value;
    const sdtValue = sdtRef.current.value;
    const diachiValue = diachiRef.current.value;
    const tinhValue = tinhRef.current.value;
    const huyenValue = huyenRef.current.value;
    const xaValue = xaRef.current.value;
    const ghichuValue = ghichuRef.current.value;

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
      total: calculateTotal(),
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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        message.success("Lưu đơn hàng thành công");
        console.log("Order submitted successfully:", data);
        // Xử lý phản hồi thành công từ máy chủ
        const id_donhang = data.id_donhang; // Lấy id_donhang từ phản hồi
        luuchitietdonhang(id_donhang); // Gọi hàm luuchitietdonhang và truyền id_donhang vào
        console.log(id_donhang);
        dispatch(XoaTatCaSP());
        if (paymentMethod === 'VNPAY-QR') { // Chỉ gọi hàm createPaymentUrl nếu phương thức thanh toán là "Thanh toán qua VNPAY-QR"
          createPaymentUrl(id_donhang, calculateTotal());
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        message.error("Lưu đơn hàng thất bại");
        // Xử lý lỗi
      });
  };

  const luuchitietdonhang = (id_donhang) => {
    // Lặp qua từng sản phẩm trong giỏ hàng để lưu chi tiết đơn hàng
    cart.forEach((product) => {
      const chiTietDonHangData = {
        id_donhang: id_donhang,
        id_chitietsp: product.id_chitietsp,
        so_luong: product.soluong,
        gia_ban: product.soluong * product.gia,
      };

      // Gửi dữ liệu chi tiết đơn hàng đến backend
      fetch("http://localhost:4000/donhang/luuchitietdonhang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chiTietDonHangData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Chi tiết đơn hàng submitted successfully:", data);
          // Xử lý phản hồi thành công từ máy chủ (nếu cần)
        })
        .catch((error) => {
          console.error("Error submitting order detail:", error);
          // Xử lý lỗi (nếu cần)
        });
    });
  };

  const createPaymentUrl = (id_donhang, total) => {
    // Gửi dữ liệu đơn hàng đến backend
    fetch("http://localhost:4000/payment/create_payment_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: id_donhang, // Chuyển id_donhang thành orderId
        amount: total, // Chuyển total thành amount
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Trả về response dưới dạng văn bản
      })
      .then((vnpUrl) => {
        // Chuyển hướng trình duyệt đến trang thanh toán
        window.location.href = vnpUrl;
      })
      .catch((error) => {
        console.error("Error creating payment URL:", error);
        // Xử lý lỗi
      });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="container-thanhtoan">
      <article>
        <div className="content-article">
          <div className="content-left">
            <div className="logo-content">
              <Link to="/">
                {" "}
                <img src="./images/SQBE Logo.png" alt="" />
              </Link>
            </div>
            <form>
              <h1>Thông tin nhận hàng</h1>
              <div className="input-container">
                <input
                  type="text"
                  ref={emailRef}
                  className="input-field"
                  required
                />
                <label htmlFor="email" className="input-label">
                  Email
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  ref={hotenRef}
                  className="input-field"
                  required
                />
                <label htmlFor="hoten" className="input-label">
                  Họ và tên
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  ref={sdtRef}
                  className="input-field"
                  required
                />
                <label htmlFor="sdt" className="input-label">
                  Số điện thoại
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  ref={diachiRef}
                  className="input-field"
                  required
                />
                <label htmlFor="diachi" className="input-label">
                  Địa chỉ
                </label>
              </div>
              <div className="input-container">
                <select
                  id="province"
                  className="input-field"
                  onChange={handleProvinceChange}
                  required
                  ref={tinhRef}
                >
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
                <select
                  id="district"
                  className="input-field"
                  onChange={handleDistrictChange}
                  required
                  ref={huyenRef}
                >
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
                <select id="ward" className="input-field" required ref={xaRef}>
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
                <textarea
                  type="text"
                  ref={ghichuRef}
                  className="textarea-field"
                  required
                />
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
                <div className="box-title">
                  Vui lòng nhập thông tin giao hàng
                </div>
              </div>
              <div className="box-thanhtoan">
                <h1>Thanh toán</h1>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input type="radio" name="payment_method" value="VNPAY-QR" onChange={handlePaymentMethodChange} />
                        Thanh toán qua VNPAY-QR
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="radio"
                          name="payment_method"
                          defaultChecked
                        />
                        Thanh toán khi giao hàng (COD)
                      </td>
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
              <table key={index}>
                <tbody>
                  <tr>
                    <td id="img" rowspan="2">
                      <img
                        src={`http://localhost:4000/chitietsanpham/${product.hinh_anh_1}`}
                        alt={product.ten_sanpham}
                      />
                      <span id="count">{product.soluong}</span>
                    </td>
                    <td id="name">{product.ten_sanpham}</td>
                    <td id="price">{product.gia * product.soluong}</td>
                  </tr>
                  <tr>
                    <td id="size">{product.ten_size}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>

          <div className="aside__discount">
            <table>
              <tbody>
                <tr>
                  <td>
                    <input placeholder="Nhập mã giảm giá" />
                  </td>
                  <td>
                    <button>Áp dụng</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="aside__total">
            <table>
              <tbody>
                <tr>
                  <td id="total__text">Tổng Cộng</td>
                  <td id="total__price">
                    <span>
                      {calculateTotal().toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td id="total__back">
                    <Link to="/viewcart">quay về giỏ hàng </Link>
                  </td>
                  <td id="total__dathang">
                    <button onClick={submitData}>Đặt hàng</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ThanhToan;

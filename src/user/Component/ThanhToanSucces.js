// Loader.jsx
import React, { useState, useEffect } from "react";
import {Link, useParams} from 'react-router-dom';

const ThanhToanSucces = () => {
  const { id_donhang } = useParams();
  const [chitietDonHang, setChiTietDonHang] = useState(null);
  const [donHang, setDonHang] = useState(null);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Chưa cập nhật";
    const vietnamTime = new Date(dateTimeString).toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    return vietnamTime;
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "Chưa cập nhật";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donhangResponse = await fetch(
          `https://api.sqbe.store/donhang/${id_donhang}`
        );
        const chitietDonhangResponse = await fetch(
          `https://api.sqbe.store/donhang/listchitietdonhang/${id_donhang}`
        );

        if (!donhangResponse.ok || !chitietDonhangResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const donhangData = await donhangResponse.json();
        const chitietDonhangData = await chitietDonhangResponse.json();

        setDonHang(donhangData);
        setChiTietDonHang(chitietDonhangData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_donhang]);

  const chuaThue = donHang && donHang.total * (1 + (donHang.phan_tram || 0) / 100);
  return (
    <div id="container-main">
    <div className="container-bill-succes" >
      <div className="img">
        <img src="./images/logosucces.jpg" alt="" />
      </div>
      <h2>cảm ơn bạn đã đặt hàng!</h2>
      <p><Link to="/">Quay lại trang chủ</Link></p>
     

      <div className="content">
        <div className="content-left">
          <p>Mã đơn hàng: <span> Spa{donHang && donHang.id_donhang}</span> - <span> {donHang ? formatDateTime(donHang.ngay_dat) : "Chưa cập nhật"}</span></p>
          <div className="content-left-box-1">
            <p>Họ và tên: <span> {donHang && donHang.hoten}</span></p>
            <p>Email:<span> {donHang && donHang.email}</span></p>
            <p>Sđt:<span> {donHang && donHang.sdt}</span></p>
            <p>Tỉnh/TP:<span>  {donHang && donHang.tinh}</span></p>
            <p>Quận/Huyện:<span> {donHang && donHang.huyen}</span></p>
            <p>Địa chỉ:<span> {donHang && donHang.diachi}</span></p>
          </div>
          <Link to={`/edit-address/${id_donhang}`}>
          <button>THAY ĐỔI ĐỊA CHỈ</button>
          </Link>
        </div>
        
        <div className="content-right">
          <p>Chi tiết đơn hàng</p>
          <div className="box-1">
          {chitietDonHang &&
                chitietDonHang.map((product, index) => (
            <div className="thongtinsanpham" key={index}>
              <img src={`https://api.sqbe.store/chitietsanpham/${product.hinh_anh_1}`}  alt="" />
              <div className="tensanphamsoluong">
                <div className="tensanpham">{product.ten_sanpham}</div>
                <div className="soluong">số lượng: {product.so_luong} / size: {product.ten_size} / màu: {product.ten_mau} </div>
              </div>
              <div className="giatien">{formatCurrency(product.gia_ban / product.so_luong)}</div>
            </div>
              ))}

            <div className="thanhtien">THÀNH TIỀN <span>{formatCurrency(chuaThue)}</span></div>
          </div>
          
          <div className="box-2">
            <p className="chiphigiaohang">Mã giảm giá</p>
            {donHang && donHang.ma_giamgia ? (
  <p className="giaohangngay">áp dụng: {`${donHang.ma_giamgia} ${donHang.phan_tram}%`}</p>
) : null}


            <p className="tong">TỔNG: <span>{formatCurrency(donHang && donHang.total)}</span></p>
          </div>
          <div className="box-3">
            <p className="phuongthucthanhtoan">PHƯƠNG THỨC THANH TOÁN</p>
            <p className="chuyenkhoanquanganhang">Chuyển khoản qua ngân hàng</p>
          </div>
       
        </div>
      </div>
    </div>
    </div>
  );
};

export default ThanhToanSucces;

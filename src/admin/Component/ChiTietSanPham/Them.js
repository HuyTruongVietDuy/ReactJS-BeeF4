import React, { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';

const AddProduct = ({ showForm, toggleForm, id, handleAddConfirmed }) => {
  const [gia, setGia] = useState('');
  const [giaKhuyenMai, setGiaKhuyenMai] = useState('');
  const [maMau, setMaMau] = useState('');
  const [tenMau, setTenMau] = useState('');

  const handleChangeGia = (event) => {
    setGia(event.target.value);
  };

  const handleChangeGiaKhuyenMai = (event) => {
    setGiaKhuyenMai(event.target.value);
  };

  const handleChangeMaMau = (event) => {
    setMaMau(event.target.value);
  };
  
  const handleChangeTenMau = (event) => {
    setTenMau(event.target.value);
  };

  const handleAddProduct = async (gia, giaKhuyenMai, maMau, tenMau) => {
    try {
      const response = await axios.post('http://localhost:4000/chitietsanpham/add', {
        id_sanpham: id,
        gia: gia,
        gia_khuyenmai: giaKhuyenMai,
        ma_mau: maMau,
        ten_mau: tenMau
      });
      if (response.data.success) {
        message.success('Thêm chi tiết sản phẩm thành công');
        handleAddConfirmed();
      } else {
        message.error('Thêm chi tiết sản phẩm thất bại');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Đã xảy ra lỗi khi thêm chi tiết sản phẩm');
    }
  };

  const handleSubmit = () => {
    if (!gia) {
      message.error('Vui lòng nhập giá sản phẩm');
      return;
    }
    toggleForm();
    handleAddProduct(gia, giaKhuyenMai, maMau, tenMau); // Thêm tham số maMau và tenMau vào hàm handleAddProduct
    setGia('');
    setGiaKhuyenMai('');
    setMaMau('');
    setTenMau('');
  };

  return (
    <div className={`sidebar-admin-form ${showForm ? 'active' : ''}`}>
      <span id="closeButton" onClick={toggleForm}>&times;</span>
      <form id="form-admin" encType="multipart/form-data">
        <h2>Thêm mới chi tiết sản phẩm: {id}</h2>

        <label htmlFor="gia">Giá:</label>
        <input
          type="text"
          id="gia"
          value={gia}
          onChange={handleChangeGia}
          required
        />

        <label htmlFor="giaKhuyenMai">Giá khuyến mãi:</label>
        <input
          type="text"
          id="giaKhuyenMai"
          value={giaKhuyenMai}
          onChange={handleChangeGiaKhuyenMai}
          required
        />

       

        {/* Thêm trường nhập liệu cho ten_mau */}
        <label htmlFor="tenMau">Tên màu:</label>
        <input
          type="text"
          id="tenMau"
          value={tenMau}
          onChange={handleChangeTenMau}
          required
        />

         {/* Thêm trường nhập liệu cho ma_mau */}
         <label htmlFor="maMau">Mã màu:</label>
         <input
           type="text"
           id="maMau"
           value={maMau}
           onChange={handleChangeMaMau}
           required
         />

        <button type="button" onClick={handleSubmit}>Thêm mới</button>
      </form>
    </div>
  );
};

export default AddProduct;

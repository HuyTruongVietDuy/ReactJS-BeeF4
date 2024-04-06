import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Import message từ antd để sử dụng thông báo

const AddVoucher = ({ showForm, toggleForm, action }) => {
  const [maGiamGia, setMaGiamGia] = useState('');
  const [phanTram, setPhanTram] = useState(0);
  const [soNgay, setSoNgay] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ngayKetThuc = new Date();
    ngayKetThuc.setDate(ngayKetThuc.getDate() + parseInt(soNgay)); // Parse soNgay thành số nguyên

    try {
      const response = await axios.post('http://localhost:4000/voucher/add-voucher', {
        ma_giamgia: maGiamGia,
        phan_tram: phanTram,
        ngay_ket_thuc: ngayKetThuc
      });

      console.log(response.data);
      message.success('Thêm mới voucher thành công'); // Hiển thị thông báo thành công
      action();
      toggleForm();
    } catch (error) {
      console.error('Error adding voucher:', error);
      message.error('Thêm mới voucher thất bại'); // Hiển thị thông báo thất bại
    }
  };

  return (
    <div className={`sidebar-admin-form ${showForm ? 'active' : ''}`}>
      <span id="closeButton" onClick={toggleForm}>&times;</span>
      <form onSubmit={handleSubmit} id="form-admin" encType="multipart/form-data">
        <h2>Thêm mới voucher</h2>
        <label htmlFor="maGiamGia">Mã giảm giá:</label>
        <input type="text" id="maGiamGia" value={maGiamGia} onChange={(e) => setMaGiamGia(e.target.value)}  required/>

        <label htmlFor="phanTram">Phần trăm giảm:</label>
        <input type="number" id="phanTram" min="0" max="100" value={phanTram} onChange={(e) => setPhanTram(e.target.value)} />


        <label htmlFor="soNgay">Số ngày kết thúc:</label>
        <select id="soNgay" value={soNgay} onChange={(e) => setSoNgay(e.target.value)} required>
          <option value="">Chọn ngày kết thúc</option>
          <option value="3">3 ngày</option>
          <option value="7">7 ngày</option>
          <option value="14">14 ngày</option>
          <option value="30">30 ngày</option>
        </select>

        <button type="submit">Thêm mới</button>
      </form>
    </div>
  );
};

export default AddVoucher;

import React, { useState, useEffect } from 'react';
import { message } from 'antd'; // Import message from Ant Design

const SuaProduct = ({ showEditModal, closeEditModal, ChiTiet, id_chitietsp, handleEditConfirmed }) => {
  const [gia, setGia] = useState('');
  const [giaKhuyenMai, setGiaKhuyenMai] = useState('');
  const [tenMau, setTenMau] = useState('');
  const [maMau, setMaMau] = useState('');

  useEffect(() => {
    if (ChiTiet) {
      setGia(ChiTiet.gia || '');
      setGiaKhuyenMai(ChiTiet.gia_khuyenmai || '');
      setTenMau(ChiTiet.ten_mau || ''); // Set giá trị ban đầu cho ten_mau
      setMaMau(ChiTiet.ma_mau || ''); // Set giá trị ban đầu cho ma_mau
    }
  }, [ChiTiet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to server
    const formData = { gia, gia_khuyenmai: giaKhuyenMai, ten_mau: tenMau, ma_mau: maMau };
    fetch(`http://localhost:4000/chitietsanpham/edit/${ChiTiet.id_chitietsp}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update product details');
      }
      // Handle success response
      message.success('Sửa sản phẩm thành công'); // Success message
      closeEditModal();
      handleEditConfirmed();
    })
    .catch(error => {
      console.error('Error updating product details:', error);
      message.error('Sửa sản phẩm thất bại'); // Error message
    });
  };
  
  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className='admin-edit-content'>
            <span id="close" onClick={closeEditModal}>x</span>
            <form className="form-admin-edit" onSubmit={handleSubmit}>
              <h1>Sửa Sản Phẩm: {id_chitietsp}</h1>
              <label htmlFor="gia">Giá:</label><br/>
              <input type="text" id="gia" name="gia" value={gia} onChange={(e) => setGia(e.target.value)} /><br/>
              <label htmlFor="gia_khuyenmai">Giá Khuyến Mãi:</label><br/>
              <input type="text" id="gia_khuyenmai" name="gia_khuyenmai" value={giaKhuyenMai} onChange={(e) => setGiaKhuyenMai(e.target.value)} /><br/>
              <label htmlFor="ten_mau">Tên Màu:</label><br/>
              <input type="text" id="ten_mau" name="ten_mau" value={tenMau} onChange={(e) => setTenMau(e.target.value)} /><br/>
              <label htmlFor="ma_mau">Mã Màu:</label><br/>
              <input type="text" id="ma_mau" name="ma_mau" value={maMau} onChange={(e) => setMaMau(e.target.value)} /><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SuaProduct;

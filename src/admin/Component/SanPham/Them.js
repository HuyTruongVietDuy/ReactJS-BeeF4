import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const AddProduct = ({ showForm, toggleForm, handleAddProduct }) => {
  const [tenSanPham, setTenSanPham] = useState('');
  const [chatlieu, setChatlieu] = useState(''); // Thêm state cho chatlieu
  const [CategoryList, setCategoryList] = useState([]);
  const [selectedDanhMucId, setSelectedDanhMucId] = useState('');

  useEffect(() => {
    const fetchDataDM = async () => {
      try {
        const response = await fetch('http://localhost:4000/danhmuc/list');
        if (!response.ok) {
          throw new Error('Failed to fetch danh muc list');
        }
      
        const data = await response.json();
    
        setCategoryList(data.danhMucList);
      } catch (error) {
        console.error('Error fetching danh muc list:', error.message);
      }
    };
  
    fetchDataDM();
  }, []);

  const handleChangeTenSanPham = (event) => {
    setTenSanPham(event.target.value);
  };

  const handleChangeChatlieu = (event) => {
    setChatlieu(event.target.value);
  };

  const handleSubmit = () => {
    if (!tenSanPham) {
      message.error('Vui lòng nhập tên sản phẩm');
      return;
    }
    toggleForm();
    handleAddProduct(tenSanPham, selectedDanhMucId, chatlieu); // Pass selected danh muc ID and chatlieu to handleAddProduct
    setTenSanPham(''); // Clear input fields after adding product
    setChatlieu('');
  };

  return (
    <div className={`sidebar-admin-form ${showForm ? 'active' : ''}`}>
      <span id="closeButton" onClick={toggleForm}>&times;</span>
      <form id="form-admin" encType="multipart/form-data">
        <h2>Thêm mới sản phẩm</h2>
        <label htmlFor="tenSanPham">Tên sản phẩm:</label>
        <input
          type="text"
          id="tenSanPham"
          value={tenSanPham}
          onChange={handleChangeTenSanPham}
          required
        />

        <label htmlFor="chatlieu">Chất liệu:</label> {/* Thêm trường input cho chất liệu */}
        <input
          type="text"
          id="chatlieu"
          value={chatlieu}
          onChange={handleChangeChatlieu}
          required
        />

        <label htmlFor="idDanhMucCha">ID danh mục cha:</label>
        {CategoryList && CategoryList.length > 0 && (
        <select
    id="idDanhMucCha"
    required
    onChange={(event) => setSelectedDanhMucId(event.target.value)}
>
    <option value="">Chọn ID danh mục cha</option>
    {CategoryList.map(danhMuc => {
        if (danhMuc.id_danhmuc !== null) {
            if (danhMuc.id_danhmuc_cha) {
                return (
                    <option key={danhMuc.id_danhmuc} value={danhMuc.id_danhmuc}>
                        {danhMuc.id_danhmuc} - {danhMuc.ten_danhmuc}
                    </option>
                );
            } else {
                return (
                    <option key={danhMuc.id_danhmuc} value={danhMuc.id_danhmuc} disabled>
                        {danhMuc.ten_danhmuc}
                    </option>
                );
            }
        } else {
            return null; // Ẩn đi các id_danhmuc có giá trị null
        }
    })}
</select>

      
        )}
        <button type="button" onClick={handleSubmit}>Thêm mới</button>
      </form>
    </div>
  );
};

export default AddProduct;

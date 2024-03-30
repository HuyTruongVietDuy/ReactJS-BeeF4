import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const AddProduct = ({ showForm, toggleForm, handleAddProduct }) => {
  const [tenSanPham, setTenSanPham] = useState('');
  const [chatlieu, setChatlieu] = useState('');
  const [mota, setMota] = useState(''); // State for mota
  const [kieuDang, setKieuDang] = useState(''); // State for kieu_dang
  const [urlProduct, setUrlProduct] = useState(''); // State for url_product
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

  const handleChangeMota = (event) => {
    setMota(event.target.value);
  };

  const handleChangeKieuDang = (event) => {
    setKieuDang(event.target.value);
  };

  const handleChangeUrlProduct = (event) => {
    setUrlProduct(event.target.value);
  };

  const handleSubmit = () => {
    if (!tenSanPham) {
      message.error('Vui lòng nhập tên sản phẩm');
      return;
    }
    toggleForm();
    handleAddProduct(tenSanPham, selectedDanhMucId, chatlieu, mota, kieuDang, urlProduct); // Pass additional fields to handleAddProduct
    setTenSanPham('');
    setChatlieu('');
    setMota('');
    setKieuDang('');
    setUrlProduct('');
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

        <label htmlFor="chatlieu">Chất liệu:</label>
        <input
          type="text"
          id="chatlieu"
          value={chatlieu}
          onChange={handleChangeChatlieu}
          required
        />

        <label htmlFor="mota">Mô tả:</label> {/* Input field for mota */}
        <input
          type="text"
          id="mota"
          value={mota}
          onChange={handleChangeMota}
          required
        />

        <label htmlFor="kieuDang">Kiểu dáng:</label> {/* Input field for kieu_dang */}
        <input
          type="text"
          id="kieuDang"
          value={kieuDang}
          onChange={handleChangeKieuDang}
          required
        />

        <label htmlFor="urlProduct">URL sản phẩm:</label> {/* Input field for url_product */}
        <input
          type="text"
          id="urlProduct"
          value={urlProduct}
          onChange={handleChangeUrlProduct}
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
                return null;
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

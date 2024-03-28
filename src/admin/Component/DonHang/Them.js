import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setDanhMucList  } from '../../../redux/danhMucSlice'; 

const AddCategory = ({ showForm, toggleForm, handleAddCategory }) => {
  const [tenDanhMuc, setTenDanhMuc] = useState('');
  const [idDanhMucCha, setIdDanhMucCha] = useState('');
  const [hinhanh, setHinhanh] = useState(null); // Thêm state cho hình ảnh
  const [previewImage, setPreviewImage] = useState(null); // Thêm state để hiển thị trước hình ảnh


  const dispatch = useDispatch();
  const danhMucList = useSelector(state => state.danhMuc.danhMucList);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDanhMuc = await fetch('http://localhost:4000/danhmuc/list');
        if (!responseDanhMuc.ok) {
          throw new Error('Failed to fetch danh muc list');
        }
        const dataDanhMuc = await responseDanhMuc.json();

        // Sử dụng action creator để cập nhật danhMucList
        dispatch(setDanhMucList(dataDanhMuc.danhMucList));
      } catch (error) {
        console.error('Error fetching danh muc list:', error.message);
      }
    };

    fetchData();
  }, [dispatch]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setHinhanh(file); // Lưu file vào state hinhanh
    // Tạo đường dẫn tạm thời cho hình ảnh để hiển thị trước
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Gọi hàm xử lý thêm danh mục từ props
      await handleAddCategory(tenDanhMuc, idDanhMucCha, hinhanh);
      resetForm();
    } catch (error) {
      console.error('Error adding category:', error.message);

    }

    // Sau khi xử lý, có thể đóng form
    toggleForm();
  };

  // Hàm reset form
  const resetForm = () => {
    setTenDanhMuc('');
    setIdDanhMucCha('');
    setHinhanh(null);
    setPreviewImage(null);
  };

  return (
    <div className={`sidebar-admin-form ${showForm ? 'active' : ''}`}>
      <span id="closeButton" onClick={toggleForm}>&times;</span>
      
      <form onSubmit={handleSubmit} id="form-admin" encType="multipart/form-data">
        <h2>Thêm mới danh mục</h2>
        <label htmlFor="tenDanhMuc">Tên danh mục:</label>
        <input
          type="text"
          id="tenDanhMuc"
          value={tenDanhMuc}
          onChange={(event) => setTenDanhMuc(event.target.value)}
          required
        />
        <label htmlFor="idDanhMucCha">ID danh mục cha:</label>
        {danhMucList && danhMucList.length > 0 && (
          <select
            id="idDanhMucCha"
            value={idDanhMucCha}
            onChange={(event) => setIdDanhMucCha(event.target.value)}
          >
            <option value="">Chọn ID danh mục cha</option>
            {danhMucList.filter(danhMuc => !danhMuc.id_danhmuc_cha).map(danhMuc => (
              <option key={danhMuc.id_danhmuc} value={danhMuc.id_danhmuc}>{danhMuc.ten_danhmuc}</option>
            ))}
          </select>
        )}
        
        
        <label htmlFor="hinhanh">Hình ảnh:</label> {/* Thêm trường input cho hình ảnh */}
        <input
          type="file"
          id="hinhanh"
          accept="image/*"
          onChange={handleFileChange} // Gọi hàm handleFileChange khi có sự thay đổi trong file input
        />
        {/* Hiển thị trước hình ảnh */}
        {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        <button type="submit">Thêm mới</button>
      </form>
    </div>
  );
};

export default AddCategory;

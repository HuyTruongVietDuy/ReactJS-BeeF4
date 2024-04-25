import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {setDanhMucList  } from '../../../redux/danhMucSlice'; 
const Sua = ({ showEditModal, closeEditModal, selectedDanhMuc, handleEditCategory }) => {
  const [danhMucData, setDanhMucData] = useState({
    ten_danhmuc: '',
    id_danhmuc_cha: '',
    hinhanh: '',
    trang_thai: '', // Thêm trạng thái vào state
    url_category: '' // Thêm url_category vào state
  });
  const [hinhanhCu, setHinhanhCu] = useState('');
  const dispatch = useDispatch();
  const danhMucList = useSelector(state => state.danhMuc.danhMucList);


useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDanhMuc = await fetch('https://api.sqbe.store/danhmuc/list');
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
  useEffect(() => {
    // Nếu có dữ liệu được chọn, gán vào danhMucData
    if (selectedDanhMuc) {
      setDanhMucData({
        ten_danhmuc: selectedDanhMuc.ten_danhmuc,
        id_danhmuc_cha: selectedDanhMuc.id_danhmuc_cha,
        hinhanh: '', // Đặt lại hình ảnh để không hiển thị hình cũ
        trang_thai: selectedDanhMuc.trang_thai, // Gán trạng thái hiện tại
        url_category: selectedDanhMuc.url_category // Gán url_category hiện tại
      });
      // Gán hình ảnh cũ nếu có
      if (selectedDanhMuc.hinhanh) {
        setHinhanhCu(`https://api.sqbe.store/danhmuc/uploads/${selectedDanhMuc.hinhanh}`);
      }
    }
  }, [selectedDanhMuc]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDanhMucData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setDanhMucData((prevState) => ({
      ...prevState,
      hinhanh: file
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      setHinhanhCu(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ten_danhmuc', danhMucData.ten_danhmuc);
      formData.append('trang_thai', danhMucData.trang_thai); // Thêm trạng thái vào FormData
      formData.append('url_category', danhMucData.url_category); 
      if (danhMucData.id_danhmuc_cha) {
        formData.append('id_danhmuc_cha', danhMucData.id_danhmuc_cha);
      }
      // Kiểm tra xem tệp hình ảnh có thay đổi không
      if (danhMucData.hinhanh instanceof File) {
        formData.append('hinhanh', danhMucData.hinhanh);
      }

      const response = await fetch(`https://api.sqbe.store/danhmuc/sua/${selectedDanhMuc.id_danhmuc}`, {
        method: 'PUT',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to update danh muc');
      }
      closeEditModal();
      message.success('Sửa thành công!');
      handleEditCategory();
      // Xử lý sau khi cập nhật thành công, có thể đóng modal hoặc làm gì đó khác
    } catch (error) {
      console.error('Error updating danh muc:', error.message);
      closeEditModal();
      message.error('Lỗi khi sửa danh mục!');
    }
  };

  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className="admin-edit-content">
            <span id="close" onClick={closeEditModal}>
              x
            </span>
            <form className="form-admin-edit" onSubmit={handleSubmit} encType="multipart/form-data">
              <h1>Sửa Danh Mục: {selectedDanhMuc.id_danhmuc}</h1>
              <label htmlFor="ten_danhmuc">Tên danh mục:</label>
              <br />
              <input type="text" id="ten_danhmuc" name="ten_danhmuc" value={danhMucData.ten_danhmuc} onChange={handleChange} />
              <br />

              <label htmlFor="id_danhmuc_cha">Danh mục cha:</label>
              <br />
              <select id="id_danhmuc_cha" name="id_danhmuc_cha" value={danhMucData.id_danhmuc_cha || ''} onChange={handleChange}>
                <option value="">-- Chọn danh mục cha --</option>
                {danhMucList.map((danhMuc) =>
                  danhMuc.id_danhmuc !== selectedDanhMuc.id_danhmuc && <option key={danhMuc.id_danhmuc} value={danhMuc.id_danhmuc}>{danhMuc.ten_danhmuc}</option>
                )}
              </select>

              <label htmlFor="trang_thai">Trạng thái:</label>
              <br />
              <select id="trang_thai" name="trang_thai" value={danhMucData.trang_thai} onChange={handleChange}>
                <option value="1">Ẩn</option>
                <option value="2">Hiện</option>
              </select>

              <label htmlFor="url_category">URL Category:</label> {/* Thêm trường input cho url_category */}
              <br />
              <input type="text" id="url_category" name="url_category" value={danhMucData.url_category} onChange={handleChange} />

              <label htmlFor="hinhanh">Hình ảnh:</label>
              <br />
              {hinhanhCu && <img id="image-preview" src={hinhanhCu} alt="" />}
              <input type="file" id="hinhanh" name="hinhanh" onChange={handleImageChange} />
              <br />
              <br />

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sua;

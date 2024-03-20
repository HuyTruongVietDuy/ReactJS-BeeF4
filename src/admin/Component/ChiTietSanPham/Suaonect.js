import React, { useState, useEffect } from 'react';
import { message } from 'antd'; // Import message from Ant Design

const Sua = ({ showEditModal, closeEditModal, editData, number,fetchdtb }) => {
  const [idMau, setIdMau] = useState(null);
  const [hinhAnh, setHinhAnh] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State to hold preview image URL

  useEffect(() => {
    // Cập nhật giá trị idMau và hinhAnh khi prop editData thay đổi
    if (editData) {
      setIdMau(editData.id_mau);
      setHinhAnh(editData.hinh_anh);
      setOldImage(editData.hinh_anh); // Set the old image when editData changes
    }
  }, [editData]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage)); // Create a preview URL for the selected image
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(`image${number}`, image);

    fetch(`http://localhost:4000/chitietsanpham/updateimage/${editData.id_mau}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update image');
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      if (data.success) {
        message.success('Hình ảnh đã được cập nhật thành công');
        fetchdtb();
        closeEditModal();
      } else {
        message.error('Cập nhật hình ảnh thất bại');
      }
    })
    .catch(error => {
      console.error('Error updating image:', error);
      message.error('Cập nhật hình ảnh thất bại');
    });
  };
  
  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className='admin-edit-content'>
            <span id="close" onClick={closeEditModal}>x</span>
            <form className="form-admin-edit" onSubmit={handleSubmit}>
              <h1>Sửa / Thêm hình ảnh: {number}</h1>
              <label htmlFor={`image${number}`}>Sửa/Thêm Hình ảnh {number}:</label><br/>
              {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px' }} />} 
              {!previewImage && oldImage && <img src={`http://localhost:4000/chitietsanpham/${oldImage}`} alt="Old Image" style={{ width: '200px', height: '200px' }} />}
              <input type="file" id={`image${number}`} name={`image${number}`} onChange={handleImageChange} /><br/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sua;

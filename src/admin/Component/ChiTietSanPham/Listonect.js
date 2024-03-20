import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { toggleForm } from '../../JS Modules/listDanhMucUtils';
import Them from './Themonect';
import Sua from './Suaonect';
import ListSoLuong from './listsoluong';
import { message } from 'antd';
import { setChiTietSanPhamList } from '../../../redux/ctsanPhamSlice';
const ListMotChiTiet = () => {
  const dispatch = useDispatch();
  const { id_chitietsp } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageNumber, setSelectedImageNumber] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [colors, setColors] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  
  const openAdd = () => {
    setShowForm(!showForm);
    toggleForm();
  };

  const handleEdit = (id_mau, hinh_anh, imageNumber) => {
    setShowEditModal(true);
    setSelectedImageNumber(imageNumber);
    setEditData({ id_mau: id_mau, hinh_anh: hinh_anh });
    console.log( imageNumber)
  };
  
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = (id_mau, imageNumber) => {
    // Gửi yêu cầu PUT đến endpoint để gỡ bỏ hình ảnh cụ thể
    fetch(`http://localhost:4000/chitietsanpham/removeimage/${id_mau}/${imageNumber}`, {
      method: 'PUT',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Xử lý kết quả sau khi gỡ bỏ hình ảnh thành công
      fetchData();
      message.success(`Xóa Hình ảnh ${imageNumber} thành công`)
      console.log(data);
      // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi gỡ bỏ hình ảnh thành công
    })
    .catch(error => {
      // Xử lý lỗi khi gửi yêu cầu hoặc khi gỡ bỏ hình ảnh thất bại
      message.error(`Xóa Hình ảnh ${imageNumber} Thất bại`)
      console.error('Error removing image:', error);
    });
  
    // Cập nhật state hoặc thực hiện các hành động khác sau khi gửi yêu cầu
    setSelectedImageNumber(imageNumber);
  };
  
  

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4000/chitietsanpham/listonect/${id_chitietsp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setColors(data.mausanpham);

      // Dispatch action to update Redux store with fetched data
      dispatch(setChiTietSanPhamList(data.mausanpham));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dispatch, id_chitietsp]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchdtb = async () => {
    fetchData();
  };
  return (
    <div id="container-main-admin">
      {selectedImage && (
        <div className="selected-image-container" onClick={() => setSelectedImage(null)}>
          <div id="selected-content">
            <img src={selectedImage} alt="Selected" className="selected-image" />
          </div>
        </div>
      )}

      <Sua showEditModal={showEditModal} closeEditModal={closeEditModal} editData={editData} number={selectedImageNumber} fetchdtb={fetchdtb} />

      <div id="container-nav-admin">
        <div className='nav-left-admin'>
          <h1>Thông tin một chi tiết</h1>
        </div>
        <div className='nav-right-admin'>
          <button onClick={openAdd}>Thêm mới</button>
        </div>
      </div>

      <div className='admin-content-component'>
        <div className='admin-content-component-top'>
          <table className="admin-table">
            <thead>
              <tr>
                {[1, 2, 3, 4, 5, 6].map(number => (
                  <th key={number}>Hình ảnh {number}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map((color, index) => (
                <tr key={index}>
                  {[1, 2, 3, 4, 5, 6].map(number => (
                    <React.Fragment key={number}>
                      {color[`hinh_anh_${number}`] ? (
                        <td>
                          <img
                            src={`http://localhost:4000/chitietsanpham/${color[`hinh_anh_${number}`]}`}
                            alt=""
                            onClick={() => handleImageClick(`http://localhost:4000/chitietsanpham/${color[`hinh_anh_${number}`]}`)}
                          />
                          <p>
                            {color[`hinh_anh_${number}`] && (
                              <React.Fragment>
                                <span onClick={() => handleEdit(color.id_mau, color[`hinh_anh_${number}`], number)}>Sửa <i className="material-icons">create</i></span> /
                                <span onClick={() => handleDelete(color.id_mau, number)}>Xóa <i className="material-icons">delete</i></span>
                              </React.Fragment>
                            )}
                          </p>
                        </td>
                      ) : (
                        <td>
                          <i className="material-icons">broken_image</i>
                          <p>
                            <span onClick={() => handleEdit(color.id_mau, color[`hinh_anh_${number}`], number)}>Thêm  <i className="material-icons">add_circle</i></span> 
                          </p>
                        </td>
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
              {colors.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <i className="material-icons">error_outline</i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
       <ListSoLuong id_chitietsp={id_chitietsp}/>
      </div>
      <Them showForm={showForm} toggleForm={openAdd} fetchdtb={fetchdtb}/>
    </div>
  );
};

export default ListMotChiTiet;

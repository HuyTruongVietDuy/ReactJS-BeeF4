import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { toggleForm } from '../../JS Modules/listDanhMucUtils';
import Them from './Them';
import Sua from './Sua';
import { message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setChiTietSanPhamList } from '../../../redux/ctsanPhamSlice';
import {  Link  } from 'react-router-dom';

const ListChiTietSanPham = () => {
  const [showForm, setShowForm] = useState(false);
  const chiTietSanPhamList = useSelector(state => state.chiTietSanPham.chiTietSanPhamList);
  const dispatch = useDispatch();
  const { id_sanpham } = useParams(); // Get the ID from the URL parameter

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSanPhamCTId, setSelectedSanPhamCTId] = useState(null);
  const [selectedSanPhamCT, setSelectedSanPhamCT] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); 
  
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4000/chitietsanpham/list/${id_sanpham}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(setChiTietSanPhamList(data));
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dispatch, id_sanpham]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setShowForm(!showForm);
    toggleForm();
  };


  const handleEdit = (sanPhamct) => {
    setShowEditModal(true);
    setSelectedSanPhamCTId(sanPhamct.id_chitietsp); 
    setSelectedSanPhamCT(sanPhamct);
  };
  
  
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    openDeleteModal();
    setSelectedSanPhamCTId(id);
    console.log('selectedSanPhamId:', id);
  };

    
    // Hàm mở và đóng modal xóa
    const openDeleteModal = () => {
      setDeleteModalVisible(true);
    };
    
    const closeDeleteModal = () => {
      setDeleteModalVisible(false);
    };
    

    const handleDeleteConfirmed = async (id) => {
      try {
          const response = await fetch(`http://localhost:4000/chitietsanpham/delete/${selectedSanPhamCTId}`, {
              method: 'DELETE',
          });
          if (!response.ok) {
              throw new Error('Failed to delete sản phẩm');
          }
          // Refresh danh sách sản phẩm sau khi xóa thành công
          console.log('Deleted sản phẩm with ID:', id);
          message.success('Xóa Sản Phẩm Thành Công!');
          fetchData();
      } catch (error) {
          console.error('Error deleting sản phẩm:', error.message);
          message.error('Xóa Sản Phẩm Thất Bại!');
      }
  };

  const handleEditConfirmed = async () => {
    fetchData();
};

const handleAddConfirmed = async () => {
  fetchData();
};

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Chưa cập nhật';
    const vietnamTime = new Date(dateTimeString).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    return vietnamTime;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div id="container-main-admin">
    <Sua showEditModal={showEditModal} closeEditModal={closeEditModal} ChiTiet={selectedSanPhamCT}  id_chitietsp={selectedSanPhamCTId} handleEditConfirmed={handleEditConfirmed} />
      <div id="container-nav-admin">
        <div className='nav-left-admin'>
          <h1>Quản lí chi tiết sản phẩm</h1>
        </div>
        <div className='nav-right-admin'>
          <button onClick={openAdd}>Thêm mới </button>
        </div>
      </div>
      <div className='admin-content-component'>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID chi tiết</th>
              <th>màu sắc</th>
              <th>giá</th>
              <th>giá khuyến mãi</th>
              <th>lượt xem</th>
              <th>Ngày Thêm</th>
              <th>Ngày Cập Nhật</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(chiTietSanPhamList.productDetails) && chiTietSanPhamList.productDetails.length > 0 ? (
            chiTietSanPhamList.productDetails.map((sanphamct, index) => (
              <tr key={index}>
                <td>{sanphamct.id_chitietsp}</td>
                <td>{sanphamct.ten_mau}</td>
                <td>{formatPrice(sanphamct.gia)}</td>
                <td>{formatPrice(sanphamct.gia_khuyenmai)}</td>
                <td>{sanphamct.luot_xem}</td>
                <td>{formatDateTime(sanphamct.time_add)}</td>
                <td>{formatDateTime(sanphamct.time_update)}</td>
                <td>
                <Link to={`/admin/motchitiet/${sanphamct.id_chitietsp}`}><button id="button-xem">Xem</button></Link>
                <button id="button-xoa" onClick={() => handleDelete(sanphamct.id_chitietsp)}>Xóa</button>
                  <button id="button-sua" onClick={() => handleEdit(sanphamct)}>Sửa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có sản phẩm nào.</td>
            </tr>
          )}
          
        </tbody>
        
        </table>
      </div>

      <Modal
      title="Xác nhận xóa"
      open={deleteModalVisible}
      onOk={() => {
        handleDeleteConfirmed(selectedSanPhamCTId);
        closeDeleteModal();
      }}
      onCancel={closeDeleteModal}
    >
      <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
    </Modal>

     <Them showForm={showForm} toggleForm={openAdd} id={id_sanpham} handleAddConfirmed={handleAddConfirmed}/>
    </div>
  );
};

export default ListChiTietSanPham;

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSanPhamList } from '../../../redux/sanPhamSlice';
  import Them from './Them';
  import Sua from './Sua';
  import { toggleForm } from '../../JS Modules/listDanhMucUtils';
  import { message, Modal } from 'antd';
  import {  Link  } from 'react-router-dom';
  const ListSanPham = () => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const SanPhamList = useSelector(state => state.sanPham.SanPhamList);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); 
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSanPhamId, setSelectedSanPhamId] = useState(null);
    const [selectedSanPham, setSelectedSanPham] = useState(null);
    const [selectedDanhMuc, setSelectedDanhMuc] = useState(null); // Chỉ định ID danh mục
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    const OpenAdd = () => {
      setShowForm(!showForm);
      toggleForm();
    };

    const handleEdit = (sanPham) => {
      setShowEditModal(true);
      setSelectedSanPhamId(sanPham.id_sanpham); 
      setSelectedSanPham(sanPham);
    };
    
    
    const closeEditModal = () => {
      setShowEditModal(false);
    };

    
      
    // Hàm để fetch dữ liệu và lọc sản phẩm theo danh mục
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://api.sqbe.store/sanpham/list');
      if (!response.ok) {
        throw new Error('Failed to fetch sản phẩm list');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        // Nếu selectedDanhMuc được chỉ định, chỉ lấy các sản phẩm với ID danh mục tương ứng
        const filteredData = selectedDanhMuc
          ? data.filter(sanPham => sanPham.id_danhmuc === selectedDanhMuc)
          : data;
        dispatch(setSanPhamList(filteredData));
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
      } else {
        dispatch(setSanPhamList([]));
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching sản phẩm list:', error.message);
    }
  }, [dispatch, selectedDanhMuc, itemsPerPage]); // Cập nhật để tái gọi hàm khi selectedDanhMuc thay đổi

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Tự động gọi hàm fetchData khi component render hoặc khi selectedDanhMuc thay đổi

  const uniqueDanhMucs = Array.from(new Set(SanPhamList.map(sanPham => sanPham.id_danhmuc)));

  const handleDanhMucChange = (event) => {
    setSelectedDanhMuc(parseInt(event.target.value)); // Cập nhật ID danh mục mới
  };
    const handleAddProduct = async (ten_sanpham, id_Danhmuc, chatlieu, mota, kieu_dang, url_product) => {
      try {
        const response = await fetch('https://api.sqbe.store/sanpham/them', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ten_sanpham, id_Danhmuc, chatlieu, mota, kieu_dang, url_product }) // Include additional fields in the request body
        });
    
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
    
        const data = await response.json();
        message.success('Thêm mới thành công!');
        console.log('Sản phẩm mới được thêm:', data);
    
        fetchData();
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        message.error('Thêm mới Thất Bại!, tên sản phẩm đã tồn tại');
      }
    };
    

    
    const handleEditProduct = async (sanPhamId, ten_sanpham, id_Danhmuc, chatlieu, trang_thai, mota, kieu_dang, url_product) => {
      try {
        const response = await fetch(`https://api.sqbe.store/sanpham/sua/${sanPhamId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ten_sanpham, id_Danhmuc, chatlieu, trang_thai, mota, kieu_dang, url_product }) // Include additional fields in the request body
        });
    
        if (!response.ok) {
          throw new Error('Failed to edit product');
        }
    
        const data = await response.json();
        message.success('Sửa thành công!');
        console.log('Sản phẩm đã được sửa:', data);
        fetchData();
        // Add logic to handle successful product edition
      } catch (error) {
        console.error('Lỗi khi sửa sản phẩm:', error);
        message.error('Sửa thất bại!, vui lòng thử lại');
      }
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
          const response = await fetch(`https://api.sqbe.store/sanpham/xoa/${id}`, {
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
  
  const updateStatus = (id_sanpham, newStatus) => {
    fetch(`https://api.sqbe.store/sanpham/updatestatus/${id_sanpham}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trang_thai: newStatus })
    })
    .then(response => {
      if (response.ok) {
        fetchData();
        message.success('Cập nhật trạng thái thành công!!');
      } else {
        // Xử lý khi fetch không thành công
        throw new Error('Cập nhật trạng thái không thành công!');
      }
    })
    .catch(error => {
      // Xử lý khi có lỗi xảy ra trong quá trình fetch
      console.error('Lỗi khi cập nhật trạng thái:', error);
      // Có thể hiển thị thông báo lỗi nếu cần
    });
  };

  const handleDelete = (id) => {
    openDeleteModal();
    setSelectedSanPhamId(id);
    console.log('selectedSanPhamId:', id);
  };
  
  

   
  
    const formatDateTime = (dateTimeString) => {
      if (!dateTimeString) return 'Chưa cập nhật';
      const vietnamTime = new Date(dateTimeString).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
      return vietnamTime;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSanPhamList = SanPhamList.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    
    return (
      <div id="container-main-admin">
      <Sua showEditModal={showEditModal} closeEditModal={closeEditModal} sanphamID={selectedSanPham} handleEditProduct={handleEditProduct} />

        
        <div id="container-nav-admin">
          <div className='nav-left-admin'>
            <h1> Quản lí sản phẩm</h1>
          </div>
          <div className='nav-right-admin'>
          <select value={selectedDanhMuc || ''} onChange={handleDanhMucChange}>
      <option value="">Tất cả danh mục</option>
      {uniqueDanhMucs.map((id, index) => (
        <option key={index} value={id}>
          {SanPhamList.find(sanPham => sanPham.id_danhmuc === id)?.ten_danhmuc}
        </option>
      ))}
    </select>
            <button onClick={OpenAdd}> Thêm mới <i className="material-icons">add_circle</i> </button>
          </div>
        </div>

        <div className='admin-content-component'>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th> Danh Mục</th>
                <th>Chất liệu</th>
                <th>Trạng thái</th>
                <th>Ngày Thêm</th>
                <th>Ngày Cập Nhật</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
            {SanPhamList.length > 0 && currentSanPhamList.map(SanPham => (
              <tr key={SanPham.id_sanpham}>
                <td>{SanPham.id_sanpham}</td>
                <td>{SanPham.ten_sanpham}</td>
                <td>{SanPham.ten_danhmuc}</td>
                <td>{SanPham.chatlieu}</td>
                <td>
                  <div>
                    {SanPham.trang_thai === 1 ? (
                      <div id="new-an" onClick={() => updateStatus(SanPham.id_sanpham, 2)}>
                        <i className="material-icons">visibility_off</i>
                      </div>
                    ) : SanPham.trang_thai === 2 ? (
                      <div id="new-hien" onClick={() => updateStatus(SanPham.id_sanpham, 1)}>
                        <i className="material-icons">visibility</i> 
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </td>
                <td>{formatDateTime(SanPham.time_add)}</td>
                <td>{formatDateTime(SanPham.time_update)}</td>
                <td>
                <Link to={`/admin/chitietsanpham/${SanPham.id_sanpham}`}><button id="button-xem">Xem</button></Link>
                  <button id="button-xoa" onClick={() => handleDelete(SanPham.id_sanpham)}>Xóa</button>
                  <button id="button-sua" onClick={() => handleEdit(SanPham)}>Sửa</button>
                </td>
              </tr>
            ))}
            {SanPhamList.length === 0 && (
              <tr>
                <td colSpan="7">Không có sản phẩm nào.</td>
              </tr>
            )}
          </tbody>
          
          
          </table>

          <div className="pagination-container">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => changePage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>

        </div>

        <Them showForm={showForm} toggleForm={OpenAdd} handleAddProduct={handleAddProduct} />

        <Modal
          title="Xác nhận xóa"
          open={deleteModalVisible}
          onOk={() => {
            handleDeleteConfirmed(selectedSanPhamId);
            closeDeleteModal();
          }}
          onCancel={closeDeleteModal}
        >
          <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
        </Modal>
      </div>
    );
  };

  export default ListSanPham;

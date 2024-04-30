import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Them from "./Them";
import Sua from "./Sua";
import { toggleForm } from "../../JS Modules/listDanhMucUtils";
import { Modal } from "antd";
import { setDanhMucList } from "../../../redux/danhMucSlice";
import { message } from "antd";
const ListDanhMuc = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDanhMucId, setSelectedDanhMucId] = useState(null); // nè
  const [selectedDanhMuc, setSelectedDanhMuc] = useState(null); // nè
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const danhMucList = useSelector((state) => state.danhMuc.danhMucList);
  const dispatch = useDispatch();

  const OpenAdd = () => {
    setShowForm(!showForm);
    toggleForm();
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleEdit = (danhMuc) => {
    setShowEditModal(true);
    setSelectedDanhMucId(danhMuc.id_danhmuc);
    setSelectedDanhMuc(danhMuc);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://api.sqbe.store/danhmuc/list");
      if (!response.ok) {
        throw new Error("Failed to fetch danh muc list");
      }
      const data = await response.json();
      dispatch(setDanhMucList(data.danhMucList));
      setTotalPages(Math.ceil(data.danhMucList.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching danh muc list:", error.message);
    }
  }, [dispatch, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddCategory = async (ten_danhmuc, id_danhmuc_cha, hinhanh,url_category) => {
    // Receive id_Danhmuc as a parameter
    try {
      const formData = new FormData();
      formData.append("ten_danhmuc", ten_danhmuc);
      formData.append("id_danhmuc_cha", id_danhmuc_cha);
      formData.append("hinhanh", hinhanh);
      formData.append('url_category', url_category);
      const response = await fetch("https://api.sqbe.store/danhmuc/them", {
        method: "POST",
        body: formData, // Use formData instead of JSON.stringify
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      message.success("Thêm mới thành công!");
      console.log("Sản phẩm mới được thêm:", data);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      message.error("Thêm mới Thất Bại!, tên Danh Muc đã tồn tại");
    }
  };
  const handleEditCategory = async () => {
    fetchData();
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
      const response = await fetch(`https://api.sqbe.store/danhmuc/xoa/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete danh muc");
      }
      // Refresh danh muc list sau khi xoa thanh cong
      console.log("Deleted danh muc with ID:", id);
      message.success("Xóa Danh Mục Thành Công!");
      fetchData();
    } catch (error) {
      console.error("Error deleting danh muc:", error.message);
      message.error("Xóa Danh Mục Thất Bại!");
    }
  };

  const handleDelete = (id) => {
    openDeleteModal();
    setSelectedDanhMucId(id); // Lưu id của danh mục cần xóa
  };

  const TimTenDanhMuctheoid = {};
  danhMucList.forEach((danhMuc) => {
    TimTenDanhMuctheoid[danhMuc.id_danhmuc] = danhMuc.ten_danhmuc;
  });

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Chưa cập nhật";
    const vietnamTime = new Date(dateTimeString).toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    return vietnamTime;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDanhMucList = danhMucList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const updateStatus = (id_danhmuc, newStatus) => {
    fetch(`https://api.sqbe.store/danhmuc/updatestatus/${id_danhmuc}`, {
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
  

  return (
    <div id="container-main-admin">
      <Sua
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        handleEditCategory={handleEditCategory}
        selectedDanhMuc={selectedDanhMuc}
      />

      {selectedImage && (
        <div
          className="selected-image-container"
          onClick={() => setSelectedImage(null)}
        >
          <div id="selected-content">
            <img
              src={selectedImage}
              alt="Selected"
              className="selected-image"
            />
          </div>
        </div>
      )}

      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> Quản lí danh mục</h1>
        </div>
        <div className="nav-right-admin">
          <button onClick={OpenAdd}>
            {" "}
            Thêm mới <i className="material-icons">add_circle</i>
          </button>
        </div>
      </div>

      <div className="admin-content-component">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Quan Hệ</th>
              <th>Ảnh</th>
              <th>Trạng thái</th>
              <th>Ngày Thêm</th>
              <th>Ngày Cập Nhật</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentDanhMucList.map((danhMuc) => (
              <tr key={`${danhMuc.id_danhmuc}_${danhMuc.someUniqueValue}`}>
                <td>{danhMuc.id_danhmuc}</td>
                <td>{danhMuc.ten_danhmuc}</td>
                <td>{TimTenDanhMuctheoid[danhMuc.id_danhmuc_cha]}</td>
                <td
                  onClick={() =>
                    handleImageClick(
                      `https://api.sqbe.store/danhmuc/uploads/${danhMuc.hinhanh}`
                    )
                  }
                >
                  <img
                    src={`https://api.sqbe.store/danhmuc/uploads/${danhMuc.hinhanh}`}
                    alt=""
                  />
                </td>
                <td>
                  <div>
                    {danhMuc.trang_thai === 1 ? (
                      <div id="new-an" onClick={() => updateStatus(danhMuc.id_danhmuc, 2)}>
                        <i className="material-icons">visibility_off</i>
                      </div>
                    ) : danhMuc.trang_thai === 2 ? (
                      <div id="new-hien" onClick={() => updateStatus(danhMuc.id_danhmuc, 1)}>
                        <i className="material-icons">visibility</i> 
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </td>
                <td>{formatDateTime(danhMuc.time_add)}</td>
                <td>
                  {danhMuc.time_update
                    ? formatDateTime(danhMuc.time_update)
                    : "Chưa cập nhật"}
                </td>
                <td>
                  <button
                    id="button-xoa"
                    onClick={() => handleDelete(danhMuc.id_danhmuc)}
                  >
                    Xóa
                  </button>
                  <button id="button-sua" onClick={() => handleEdit(danhMuc)}>
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container" style={{zIndex:"1"}}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => changePage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <Them
        showForm={showForm}
        toggleForm={OpenAdd}
        handleAddCategory={handleAddCategory}
      />

      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={() => {
          handleDeleteConfirmed(selectedDanhMucId);
          closeDeleteModal();
        }}
        onCancel={closeDeleteModal}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
      </Modal>
    </div>
  );
};

export default ListDanhMuc;

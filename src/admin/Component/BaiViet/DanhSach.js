import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBaivietList } from "../../../redux/baivietSlice";
import { Link } from 'react-router-dom';
import { message, Modal } from 'antd';

const ListUser = () => {
  const dispatch = useDispatch();
  const listbaiviet = useSelector((state) => state.baiviet.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [articleToDeleteId, setArticleToDeleteId] = useState(null);

  const fetchData = useCallback(() => {
    fetch('http://localhost:4000/baiviet/listbaiviet')
      .then(response => response.json())
      .then(data => {
        dispatch(setBaivietList(data));
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = listbaiviet.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Chưa cập nhật';
    const vietnamTime = new Date(dateTimeString).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    return vietnamTime;
  };

  const updateStatus = (id_baiviet, newStatus) => {
    fetch(`http://localhost:4000/baiviet/updatestatus/${id_baiviet}`, {
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
        throw new Error('Cập nhật trạng thái không thành công!');
      }
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    });
  };

  const deleteArticle = (id_baiviet) => {
    setArticleToDeleteId(id_baiviet);
    setIsModalVisible(true);
  };

  const deleteConfirmed = (id_baiviet) => {
    fetch(`http://localhost:4000/baiviet/delete/${id_baiviet}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        fetchData();
        message.success('Xóa bài viết thành công!!');
      } else {
        throw new Error('Xóa bài viết không thành công!');
      }
    })
    .catch(error => {
      console.error('Lỗi khi xóa bài viết:', error);
    });
  };

  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className='nav-left-admin'>
          <h1> Quản lí bài viết</h1>
        </div>
        <div className='nav-right-admin'>
          <Link to='/admin/them-bai-viet'><button > Thêm mới <i className="material-icons">add_circle</i> </button></Link>
        </div>
      </div>
      <div className='admin-content-component'>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>hình ảnh</th>
              <th>ngày thêm</th>
              <th>ngày cập nhật</th>
              <th>trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentNews.map((news, index) => (
              <tr key={index}>
                <td>{news.id_baiviet}</td>
                <td>{news.tieude}</td>
                <td>
                  <img src={`http://localhost:4000/baiviet/uploads/${news.hinhanh}`} alt="Hình ảnh" />
                </td>
                <td>{formatDateTime(news.time_add)}</td>
                <td>{formatDateTime(news.time_update)}</td>
                <td>
                  <div>
                    {news.trang_thai === 1 ? (
                      <div id="new-an" onClick={() => updateStatus(news.id_baiviet, 2)}>
                        <i className="material-icons">visibility_off</i>
                      </div>
                    ) : news.trang_thai === 2 ? (
                      <div id="new-hien" onClick={() => updateStatus(news.id_baiviet, 1)}>
                        <i className="material-icons">visibility</i> 
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    {/* Edit button */}
                    <Link to={`/admin/edit-bai-viet/${news.id_baiviet}`}>
                      <button id="button-sua">Sửa</button>
                    </Link>
                    {/* Delete button */}
                    <button id="button-xoa" onClick={() => deleteArticle(news.id_baiviet)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
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
      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          deleteConfirmed(articleToDeleteId);
          setIsModalVisible(false);
        }}
      >
        <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
      </Modal>
    </div>
  );
};

export default ListUser;

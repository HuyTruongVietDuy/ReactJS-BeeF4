import React, { useState, useEffect } from 'react';

const ListSoLuong = ({ id_chitietsp }) => {
  const [warehouseInventory, setWarehouseInventory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/khohang/quanlykho/${id_chitietsp}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
          setWarehouseInventory(data.warehouseInventory);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id_chitietsp]); 

  const handleDelete = async (id_kho) => { // Thay đổi tham số từ id_size sang id_kho
    try {
      const response = await fetch(`http://localhost:4000/khohang/quanlykho/${id_kho}`, { // Sửa đường dẫn API để gọi đến router xóa với id_kho
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        // Refresh data after successful deletion
     
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <div className='admin-content-component-bottom'>
      <h1>Thông tin số lượng chi tiết sản phẩm</h1> <br/>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Id chi tiết</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Size sản phẩm</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Màu</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Số lượng</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Tình Trạng</th>
            </tr>
          </thead>
          <tbody>
          {warehouseInventory.map(item => (
  <tr key={item.id} style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{id_chitietsp}</td>
    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.ten_size}</td>
    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.ten_mau}</td>
    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.so_luong}</td>
    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
      {item.so_luong === null || item.so_luong === 0 ? (
        <span style={{ color: 'red' }}>Hết hàng</span>
      ) : item.so_luong < 5 ? (
        <span style={{ color: 'orange' }}>Sắp hết hàng</span>
      ) : (
        <span style={{ color: 'green' }}>Còn hàng</span>
      )}
    </td>
    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
      <button id="button-sua"   onClick={() => handleDelete(item.id_kho)}>Xóa</button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default ListSoLuong;

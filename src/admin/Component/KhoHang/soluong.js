import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Soluong = ({ productId , refreshProductDetails}) => {
  const [productDetails, setProductDetails] = useState(null); // State to store product details
  const [totalQuantityAll, setTotalQuantityAll] = useState(0); // State to store total quantity for all products

  useEffect(() => {
    if (productId) {
      
      fetchProductDetails(productId); // Fetch product details when productId changes
    }
  }, [productId, refreshProductDetails]);

  // Function to fetch product details from the API
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`https://api.sqbe.store/khohang/totalquanlity/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      // Filter out any null or undefined values from the data array
      const filteredData = data.quantities.filter(detail => detail.id_chitietsp !== null && detail.id_chitietsp !== undefined);
      setProductDetails(filteredData); // Update state with fetched product details
      setTotalQuantityAll(data.totalQuantityAll); // Update state with total quantity for all products
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };



  return (
    <div>
      {productDetails && (
        <div>
          {/* Render product details in a table */}
          <h2 style={{ marginBottom: '1rem', marginLeft: '20px' }}>Tổng số lượng: {totalQuantityAll}</h2>
          <table style={{ width: '90%', borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Sản Phẩm</th>
                <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Số lượng</th>
                <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Tình trạng</th>
                <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
            {productDetails.map(detail => (
              <tr key={detail.id_chitietsp}>
                  <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{detail.ten_sanpham} - {detail.ten_mau}</td>
                  <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{detail.total_quantity || 0}</td>
                  <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                    {detail.total_quantity === null ? (
                      <span style={{ color: 'red' }}>Hết hàng</span>
                    ) : detail.total_quantity === 0 ? (
                      <span style={{ color: 'red' }}>Hết hàng</span>
                    ) : detail.total_quantity < 5 ? (
                      <span style={{ color: 'orange' }}>Sắp hết hàng</span>
                    ) : (
                      <span style={{ color: 'green' }}>Còn hàng</span>
                    )}
                  </td>
                  <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                    <Link to={`/admin/motchitiet/${detail.id_chitietsp}`}>Xem</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Soluong;

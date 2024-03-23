import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import SoLuong from './soluong';

const KhoHang = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');
  const [productDetails, setProductDetails] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchSizes();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/sanpham/list');
      if (!response.ok) {
        throw new Error('Lỗi khi fetch dữ liệu');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await fetch('http://localhost:4000/khohang/listsize');
      if (!response.ok) {
        throw new Error('Lỗi khi fetch danh sách kích thước');
      }
      const data = await response.json();
      setSizes(Array.isArray(data.warehouseInventory) ? data.warehouseInventory : []);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/chitietsanpham/list/${productId}`);
      if (!response.ok) {
        throw new Error('Lỗi khi fetch chi tiết sản phẩm');
      }
      const data = await response.json();
      setSelectedDetail(data.productDetails[0].id_chitietsp);
      const defaultQuantity = {};
      data.productDetails.forEach(detail => {
        defaultQuantity[detail.id_chitietsp] = 0;
      });
      setQuantity(defaultQuantity);
      setProductDetails(data.productDetails);
    } catch (error) {
      console.error('Lỗi:', error);
      setProductDetails([]);
    }
  };

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    setSelectedProduct(selectedProductId);
    if (selectedProductId !== '') {
      fetchProductDetails(selectedProductId);
    } else {
      setProductDetails([]);
    }
  };

  const handleAddQuantity = async (idChitietsp, idMau) => {
    console.log('id_chitietsp:', idChitietsp);
    console.log('id_mau:', idMau);
    console.log('id_size:', selectedSize);
    console.log('so_luong:', quantity[idChitietsp]);
      // Kiểm tra nếu số lượng không được nhập
  if (!quantity[idChitietsp]) {
    message.warning('Vui lòng nhập số lượng sản phẩm.');
    return; // Ngăn chặn việc gửi request nếu số lượng không được nhập
  }

  // Kiểm tra nếu chưa chọn size
  if (!selectedSize) {
    message.warning('Vui lòng chọn kích thước sản phẩm.');
    return; // Ngăn chặn việc gửi request nếu chưa chọn size
  }
    try {
      const response = await fetch(`http://localhost:4000/khohang/add-quantity/${idChitietsp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_mau: idMau,
          id_size: selectedSize,
          so_luong: quantity[idChitietsp],
        }),
      });
      const data = await response.json();
      console.log(data);
      message.success('Thêm số lượng thành công');
    } catch (error) {
      console.error('Lỗi:', error);
      message.error('Thêm số lượng Thất bại');
    }
  };

  const handleQuantityChange = (event, productId) => {
    const value = event.target.value;
    setQuantity({ ...quantity, [productId]: value });
  };

  const handleSizeChange = (event) => {
    const selectedSizeId = event.target.value;
    setSelectedSize(selectedSizeId);
  };

  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className='nav-left-admin'>
          <h1> Quản lí kho hàng</h1>
        </div>
        <div className='nav-right-admin'>
          <select onChange={handleProductChange}>
            <option value=""> Chọn Tên Sản Phẩm</option>
            {products.map(product => (
              <option key={product.id_sanpham} value={product.id_sanpham}>{product.ten_sanpham}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='admin-content-component'>
        <table className="admin-table">
          <thead>
            <tr>
              <th colSpan="3" style={{textAlign:"left"}}><h1>Size</h1></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3" style={{ textAlign: "left" }}>
                {sizes && sizes.length > 0 ? sizes.map((size, index) => (
                  <React.Fragment key={index}>
                    <input 
                      type="radio" 
                      id={`size-${index}`} 
                      name="size" 
                      value={size.id_size} 
                      className="admin-size-checkbox" 
                      onChange={handleSizeChange} 
                    />
                    <label htmlFor={`size-${index}`} className="admin-size-label">{size.ten_size}</label>
                    {index < sizes.length - 1 && ' '}
                  </React.Fragment>
                )) : 'Không có kích thước'}
              </td>
            </tr>
          </tbody>
       
          <thead>
            <tr>
              <th> Màu sắc</th>
              <th> Số lượng</th>
              <th> Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {productDetails && productDetails.length > 0 ? (
              productDetails.map(detail => (
                <tr key={detail.id_chitietsp}>
                  <td value={detail.id_chitietsp}>
                    <div className='color-size' style={{ backgroundColor: `${detail.ma_mau}` }}></div>
                    {detail.ten_mau}
                  </td>
                  <td> 
                    <input 
                      type='number' 
                      placeholder='nhập số lượng sản phẩm' 
                      id="slsp" 
                      
                      onChange={(e) => handleQuantityChange(e, detail.id_chitietsp)} 
                    />
                  </td>
                  <td>  <button  id="button-sua"  onClick={() => handleAddQuantity(detail.id_chitietsp, detail.id_mau)} >Thêm</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{margin:'20px 0'}}><h1>Vui lòng chọn loại sản phẩm</h1></td>
              </tr>
            )}
          </tbody>
        </table>

      
      </div>
      <SoLuong productId={selectedProduct} />
    </div>
  );
};

export default KhoHang;
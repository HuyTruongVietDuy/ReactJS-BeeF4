import React, { useState, useEffect } from 'react';
import { themSP } from "../../redux/cartSlice";
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate  } from "react-router-dom";
import { message } from 'antd';
const Modal = ({ onClose, show, productId }) => {
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const cart = useSelector((state) => state.cart.listSP);
  useEffect(() => {
    if (show) {
      fetch(`http://localhost:4000/chitietsanpham/listctsp/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          const productDetails = data.productDetails;
          if (productDetails && productDetails.length > 0) {
            setProduct(productDetails[0]); // Lấy ra sản phẩm đầu tiên
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [show, productId]);

  
  const handleAddToCart = () => {
    if (!selectedSize) {
      message.warning('Vui lòng chọn size sản phẩm');
      return;
    }
  
    if (selectedSize.so_luong === 0) {
      message.warning('Sản phẩm đã hết hàng');
      return;
    }
    
    const productToAdd = {
      ...product,
      id_size: selectedSize.id_size,
      ten_size: selectedSize.ten_size,
      so_luong: 1 // Số lượng mặc định là 1
    };
    
    // Assuming productDetail contains the selected product
    dispatch(themSP(productToAdd));
    message.success('Thêm vào giỏ hàng thành công');
    onClose();
    setSelectedSize('');
    navigate("/thanhtoan");
  };
  

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        if (productId) {
          const response = await fetch(
            `http://localhost:4000/sanpham/sizes/${product.id_chitietsp}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch sizes");
          }
          const data = await response.json();
          setSizes(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, [product]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };


  if (!show || !product) {
    return null;
  }

  return (
    <div className="modal-overlay">
      
      <div className="modal-content">
      <button onClick={onClose}>X</button>
        <div className='left'>
        <img src={`http://localhost:4000/chitietsanpham/${product.hinh_anh_1}`} alt=""  />
        </div>
        <div className='right'> 
        <div className='name-product'> {product.ten_sanpham}</div>
        <div className='price-product'>Giá: {formatPrice(product.gia)}</div>
        <div className='color-product'>Màu: {product.ten_mau}</div>
        <div className='name-product'>   <select id="select-size" onChange={(e) => setSelectedSize(sizes.find(size => size.id_size === parseInt(e.target.value)))}>
            <option value="">Chọn size</option>
            {sizes.map((size) => (
  <option key={size.id_size} value={size.id_size} style={{ color: size.so_luong === 0 ? 'tomato' : 'black' }}>
    {size.ten_size} {size.so_luong === 0 ? "- hết hàng" : ""}
  </option>
))}



          </select></div>
</div>
        

        <span id='add-to-cart' onClick={handleAddToCart}>Xác nhận</span>
   
      </div>
   
    </div>
  );
};

export default Modal;

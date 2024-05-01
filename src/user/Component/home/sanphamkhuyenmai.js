import React, { useState, useEffect, useCallback  } from "react";
import { Link } from "react-router-dom";
import ModalProduct from "../modal-addcart";
import ModalProductBuy from "../modal-buy";

import { useSelector, useDispatch } from 'react-redux';
import { setSaleProducts  } from '../../../redux/saleProductSlice';
import { message } from 'antd';
function SanPhamKhuyenMai( ) {
  const productList = useSelector((state) => state.saleProducts); 
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
 
  const [colors, setColors] = useState({}); // State để lưu trữ thông tin màu
  const [selectedColor, setSelectedColor] = useState({}); // State để lưu trữ màu đã chọn cho mỗi sản phẩm
  
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [modalBuyProductId, setModalBuyProductId] = useState(null); 
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [modalAddCartProductId, setAddCartProductId] = useState(null); 
 
  // Hàm mở modal
 // Tạo trạng thái để quản lý số lượng sản phẩm hiển thị
 const [visibleProductsCount, setVisibleProductsCount] = useState(4);
   
 const handleViewMoreClick = () => {
  setVisibleProductsCount((prevCount) => prevCount + 4); // Tăng thêm 8 sản phẩm
};
  const handleBuy = (id_sanpham) => {
    setModalBuyProductId(id_sanpham);
    setShowBuyModal(true);
  };
  
  const handleAddToCart = (id_sanpham) => {
    setAddCartProductId(id_sanpham);
    setShowAddToCartModal(true);
  };
  

  const handleCloseBuyModal = () => {
    setShowBuyModal(false);
    setModalBuyProductId(null);
  };
  
  const handleCloseAddToCartModal = () => {
    setShowAddToCartModal(false);
    setAddCartProductId(null);
  };
  

  
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://api.sqbe.store/sanpham/list-promotions");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      dispatch(setSaleProducts(data)); // Dispatch action để cập nhật danh sách sản phẩm mới
      data.forEach(product => {
        fetchColors(product.id_sanpham);
      });
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Hàm để lấy thông tin màu dựa trên id_sanpham
  const fetchColors = async (id_sanpham) => {
    try {
      const response = await fetch(`https://api.sqbe.store/sanpham/colors/${id_sanpham}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    
      // Cập nhật state màu
      setColors(prevColors => ({
        ...prevColors,
        [id_sanpham]: data
      }));
      // Khởi tạo màu đã chọn cho mỗi sản phẩm
      setSelectedColor(prevSelectedColors => ({
        ...prevSelectedColors,
        [id_sanpham]: data[0] // Chọn màu đầu tiên mặc định
      }));
    } catch (error) {

    }
  };

  // Hàm xử lý khi chọn màu
  const handleColorSelect = (productId, selectedColorId) => {
    const selectedColorObj = colors[productId].find(color => color.id_mau === selectedColorId);
    setSelectedColor(prevSelectedColors => ({
      ...prevSelectedColors,
      [productId]: selectedColorObj
    }));
  };


  const handleFavoriteClick = async (productId, userId) => {
    
    try {
        if (!userId) {
      // Hiển thị cảnh báo nếu không có người dùng đăng nhập
      message.warning('Vui lòng đăng nhập tài khoản!!');
      return;
    }
      const response = await fetch(`https://api.sqbe.store/taikhoan/addfavorite/${productId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchData();
      message.success('Đã thêm vào sản phẩm yêu thích');
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
    
    }
  };
  

  const handleRemoveFavoriteClick = async (productId, userId) => {
    try {
      const response = await fetch(`https://api.sqbe.store/taikhoan/removefavorite/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchData();
      message.success('Đã xóa sản phẩm yêu thích');
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
    
    }
  };
  


  
  
  return (
    <div className="container-product-show">
      <div className="center-layout">
      {productList.slice(0, visibleProductsCount).map((product) => (
          product.trang_thai === 2 && (
            <div className="product" key={product.id_sanpham}>
              <div className="product-image">
                <Link to={`/chitietsanpham/${product.url_product}`}>
                  <img src={`https://api.sqbe.store/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_6}`} alt="" className="main-image" />
                  {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                    <img src={`https://api.sqbe.store/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_1}`} alt="" className="hover-image" />
                  )}
                </Link>
                <div className="product-button-container">
                  <button className="buy-now"  onClick={() => handleBuy(product.id_sanpham)}> Mua Ngay </button>
                  <button className="add-to-cart"   onClick={() => handleAddToCart(product.id_sanpham)}> Thêm vào giỏ </button>
                </div>
                <div className="favorite">
                  {user && user.id_user && product.id_user === user.id_user ? (
                    <i className="material-icons" style={{ color: ' rgb(174, 11, 38)' }} onClick={() => handleRemoveFavoriteClick(product.id_sanpham, user.id_user)}>favorite</i>
                  ) : (
                    <i className="material-icons" onClick={() => handleFavoriteClick(product.id_sanpham, user ? user.id_user : null)}>favorite</i>
                  )}
                </div>
                {product.tong_so_luong === 0 || product.tong_so_luong === null ? (
                  <div className="sold-out">Hết hàng</div>
                ) : null}
              </div>
              <div className="product-details">
                <div className="container-color">
                  {colors[product.id_sanpham] && colors[product.id_sanpham].map(color => (
                    <div
                      id="color"
                      key={color.id_mau}
                      style={{ backgroundColor: color.Ma_mau }}
                      onClick={() => handleColorSelect(product.id_sanpham, color.id_mau)}
                    ></div>
                  ))}
                </div>
                <div className="product-name">{product.ten_sanpham}</div>
                <div className="product-price">
                  {product.gia_khuyenmai ? (
                    <span>
                      <span style={{ textDecoration: "line-through", color: "tomato" }}>
                        {parseFloat(product.gia).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>{" "}
                      <span id="gia_khuyenmai">
                        {parseFloat(product.gia_khuyenmai).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </span>
                  ) : (
                    parseFloat(product.gia).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  )}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      {visibleProductsCount < productList.length && ( // Sử dụng productList
        <div id='view-more-product'>
          <button onClick={handleViewMoreClick}>Xem thêm</button> {/* Thêm sự kiện onClick */}
        </div>
      )}
      <ModalProduct onClose={handleCloseAddToCartModal} show={showAddToCartModal} productId={modalAddCartProductId} />
<ModalProductBuy onClose={handleCloseBuyModal} show={showBuyModal} productId={modalBuyProductId} />

    </div>
  );
  
}

export default SanPhamKhuyenMai;

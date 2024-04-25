// Trong component Product
import React, { useState, useEffect, useCallback  } from "react";
import { Link, useParams } from "react-router-dom";

import ModalProduct from "./modal-addcart";
import ModalProductBuy from "./modal-buy";

import { useSelector, useDispatch } from 'react-redux';
import { setNewProducts } from '../../redux/newProductsSlice';
import { message } from 'antd';
function SanPhamYeuThich({  thutuFilter  }) {
  const productList = useSelector((state) => state.newProducts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const { id_user } = useParams();
  
  
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [modalBuyProductId, setModalBuyProductId] = useState(null); 
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [modalAddCartProductId, setAddCartProductId] = useState(null);

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
     const response = await fetch(`https://api.sqbe.store/sanpham/listfavorites/${id_user}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch(setNewProducts(data)); // Dispatch action để cập nhật danh sách sản phẩm mới
      data.forEach(product => {
        fetchColors(product.id_sanpham);
      });
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }, [id_user, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  
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
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
      console.error('Error adding product to favorites:', error);
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
      message.success('Đã xóa sản phẩm yêu thích');
      fetchData();
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };

  const fetchColors = async (id_sanpham) => {
    try {
      const response = await fetch(`https://api.sqbe.store/sanpham/colors/${id_sanpham}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setColors(prevColors => ({
        ...prevColors,
        [id_sanpham]: data
      }));
      setSelectedColor(prevSelectedColors => ({
        ...prevSelectedColors,
        [id_sanpham]: data[0]
      }));
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const handleColorSelect = (productId, selectedColorId) => {
    const selectedColorObj = colors[productId].find(color => color.id_mau === selectedColorId);
    setSelectedColor(prevSelectedColors => ({
      ...prevSelectedColors,
      [productId]: selectedColorObj
    }));
  };

 



  
  const sortProductsByOrder = (products, thutuFilter) => {
    // Create a copy of the products array
    const sortedProducts = [...products];

    switch (thutuFilter) {
        case "0": // Không sắp xếp
            return sortedProducts;
        case "1": // Mới nhất
            return sortedProducts.sort((a, b) => new Date(b.ngay_tao) - new Date(a.ngay_tao));
        case "2": // Giá tăng dần
            return sortedProducts.sort((a, b) => parseFloat(a.gia) - parseFloat(b.gia));
        case "3": // Giá giảm dần
            return sortedProducts.sort((a, b) => parseFloat(b.gia) - parseFloat(a.gia));
        default:
            return sortedProducts;
    }
};



  
  const sortedAndFilteredProducts = [...sortProductsByOrder(productList, thutuFilter)];


  
  return (
    <div id='container-main'>
      <h1 style={{ textAlign: 'center', fontSize: '1.4vw' }}> Sản phẩm yêu thích của tôi</h1>
      <div className="container-product-show">
        <div className="center-layout">
          {sortedAndFilteredProducts.map((product) => (
            <div className="product" key={product.id_sanpham}>
              <div className="product-image">
                <Link to={`/chitietsanpham/${product.id_sanpham}`} >
                  <img src={`https://api.sqbe.store/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_1}`} alt="" className="main-image" />
                  {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                    <img src={`https://api.sqbe.store/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_6}`} alt="" className="hover-image" />
                  )}
                </Link>
                <div className="product-button-container ">
                <button className="buy-now"  onClick={() => handleBuy(product.id_sanpham)}> Mua Ngay </button>
                <button className="add-to-cart"   onClick={() => handleAddToCart(product.id_sanpham)}> Thêm vào giỏ </button>
                </div>
                <div className="favorite">
                  {user && user.id_user && product.id_user === user.id_user ? (
                    <i className="material-icons" style={{ color: 'rgb(174, 11, 38)' }} onClick={() => handleRemoveFavoriteClick(product.id_sanpham, user.id_user)}>favorite</i>
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
          ))}
          {sortedAndFilteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2em' }}>
              Bạn không có thích sản phẩm nào
              <p style={{textDecoration:'under-line', color:"blue", marginTop: '20px'}}><Link to='/' style={{ color:"blue"}}> quay trở về trang chủ</Link></p>
            </div>
          )}
        </div>
      </div>
      <ModalProduct onClose={handleCloseAddToCartModal} show={showAddToCartModal} productId={modalAddCartProductId} />
<ModalProductBuy onClose={handleCloseBuyModal} show={showBuyModal} productId={modalBuyProductId} />
    </div>
  );
}

export default SanPhamYeuThich;

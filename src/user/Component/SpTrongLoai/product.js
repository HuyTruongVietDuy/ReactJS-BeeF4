// Trong component Product
import React, { useState, useEffect, useCallback  } from "react";
import { Link, useParams } from "react-router-dom";
import ModalProduct from "../modal-addcart";
import ModalProductBuy from "../modal-buy";
import { useSelector, useDispatch } from 'react-redux';
import { setNewProducts } from '../../../redux/newProductsSlice';
import { message } from 'antd';
function Product({  thutuFilter  }) {
  const productList = useSelector((state) => state.newProducts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  const { url_category } = useParams();

    const [showBuyModal, setShowBuyModal] = useState(false);
  const [modalBuyProductId, setModalBuyProductId] = useState(null); 
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [modalAddCartProductId, setAddCartProductId] = useState(null); 
  // Hàm mở modal

   
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
     const response = await fetch(`http://localhost:4000/sanpham/${url_category}`);
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
  }, [url_category, dispatch]);

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
      const response = await fetch(`http://localhost:4000/taikhoan/addfavorite/${productId}/${userId}`, {
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
      console.error('Error adding product to favorites:', error);
    }
  };
  

  const handleRemoveFavoriteClick = async (productId, userId) => {
    try {
      const response = await fetch(`http://localhost:4000/taikhoan/removefavorite/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchData();
      message.success('Đã xóa sản phẩm yêu thích')
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };

  const fetchColors = async (id_sanpham) => {
    try {
      const response = await fetch(`http://localhost:4000/sanpham/colors/${id_sanpham}`);
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
    <div className="container-product-show">
      <div className="center-layout">
        {sortedAndFilteredProducts.map((product) => (
            product.trang_thai === 2 && (
          <div className="product" key={product.id_sanpham}>
             <div className="product-image">
              <Link to={`/chitietsanpham/${product.url_product}`} > 
              <img src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_6}`} alt="" className="main-image" />
              {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                <img src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_1}`} alt="" className="hover-image" />
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
            )
        ))}
      </div>
      <ModalProduct onClose={handleCloseAddToCartModal} show={showAddToCartModal} productId={modalAddCartProductId} />
<ModalProductBuy onClose={handleCloseBuyModal} show={showBuyModal} productId={modalBuyProductId} />
    </div>
  );
}

export default Product;

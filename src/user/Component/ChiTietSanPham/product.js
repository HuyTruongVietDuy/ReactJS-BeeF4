// Trong component Product
import React, { useState, useEffect, useCallback  } from "react";
import { Link } from "react-router-dom";
import ModalProduct from "../ProductModal";
import {addToCart} from "../../JS Modules/UserClick";
import { useSelector, useDispatch } from 'react-redux';
import { setNewProducts } from '../../../redux/newProductsSlice';
import { message } from 'antd';
function Product({ priceFilter, thutuFilter, loaiFilter, colorFilter  }) {
  const productList = useSelector((state) => state.newProducts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm xử lý khi người dùng nhấp vào nút "Thêm vào giỏ"
  const handleAddToCartClick = () => {
    // Thực hiện hàm addToCart từ JS module
    addToCart();
    
    // Mở modal bằng cách cập nhật state
    setIsModalOpen(true);
  };
  

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://api.sqbe.store/sanpham/listall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      // Chỉ lấy 4 sản phẩm đầu tiên
      const limitedData = data.slice(0, 4);
  
      dispatch(setNewProducts(limitedData)); // Dispatch action để cập nhật danh sách sản phẩm mới với số lượng giới hạn
  
      limitedData.forEach((product) => {
        fetchColors(product.id_sanpham); // Fetch màu của 4 sản phẩm đầu tiên
      });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }, [dispatch]);
  
  
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
        message.success('Đã thêm vào sản phẩm yêu thích');
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
        fetchData();
        message.success('Đã xóa sản phẩm yêu thích');
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

  
  return (
<div>
<h1 style={{marginLeft:'12%',marginTop:'4%'}}><p style={{fontSize:'1.7vw'}}>Sản phẩm liên quan</p></h1> <br/>
    <div className="container-product-show">
  
      <div className="center-layout">
       
        {productList.map((product) => (
           product.trang_thai === 2 && (
          <div className="product" key={product.id_sanpham}>
             <div className="product-image">
              <Link to={`/chitietsanpham/${product.url_product}`} > 
              <img src={`https://api.sqbe.store/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_1}`} alt="" className="main-image" />
              {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                <img src={`https://api.sqbe.store/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_6}`} alt="" className="hover-image" />
              )}
              </Link>
              <div className="product-button-container ">
                <button className="buy-now"> Mua Ngay </button>
                <button className="add-to-cart" onClick={handleAddToCartClick}> Thêm vào giỏ </button>
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
      {isModalOpen && <ModalProduct />}
    </div>
    </div>
  );
}

export default Product;
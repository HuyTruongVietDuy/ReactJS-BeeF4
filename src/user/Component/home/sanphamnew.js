import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalProduct from "../ProductModal";
import {addToCart} from "../../JS Modules/UserClick";
function SanPhamNew( ) {
  const [productList, setProductList] = useState([]);
  const [colors, setColors] = useState({}); // State để lưu trữ thông tin màu
  const [selectedColor, setSelectedColor] = useState({}); // State để lưu trữ màu đã chọn cho mỗi sản phẩm
  const [isModalOpen, setIsModalOpen] = useState(false);

   // Hàm xử lý khi người dùng nhấp vào nút "Thêm vào giỏ"
   const handleAddToCartClick = () => {
    // Thực hiện hàm addToCart từ JS module
    addToCart();
    
    // Mở modal bằng cách cập nhật state
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/sanpham/listnew");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductList(data);
        
        // Lấy thông tin màu cho từng sản phẩm
        data.forEach(product => {
          fetchColors(product.id_sanpham);
        });
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    }

    fetchData();
  }, []);

  // Hàm để lấy thông tin màu dựa trên id_sanpham
  const fetchColors = async (id_sanpham) => {
    try {
      const response = await fetch(`http://localhost:4000/sanpham/colors/${id_sanpham}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
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
      console.error("Error fetching colors:", error);
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

  return (
    <div className="container-product-show">
      <div className="center-layout">
      <div className="title-new-product">
      <div className="scroll-wrapper">
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
      </div>
    </div>
        {productList.map((product) => (
          <div className="product" key={product.id_sanpham}>
      
           
              <div className="product-image">
              <Link to={`/chitietsanpham/${product.id_sanpham}`} > 
              <img src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_1}`} alt="" className="main-image" />
              {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                <img src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_2}`} alt="" className="hover-image" />
              )}
              </Link>
              <div className="product-button-container ">
                <button className="buy-now"> Mua Ngay </button>
                <button className="add-to-cart" onClick={handleAddToCartClick}> Thêm vào giỏ </button>
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

      </div>
      {isModalOpen && <ModalProduct />}
    </div>
  );
}

export default SanPhamNew;

// Trong component Product
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ModalProduct from "../ProductModal";
import {addToCart} from "../../JS Modules/UserClick";
function Product({ priceFilter, thutuFilter, loaiFilter  }) {
  const [productList, setProductList] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { url_category_con } = useParams();
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
        const response = await fetch(`http://localhost:4000/sanpham/listdanhmuccon/${url_category_con }`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductList(data)
        
        data.forEach(product => {
          fetchColors(product.id_sanpham);
        });
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    }

    fetchData();
  }, [url_category_con]);

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

  const filterProductsByPrice = (products, priceFilter) => {
    if (priceFilter === "0") {
      return products;
    }
    

    const [minPrice, maxPrice] = priceFilter.split("-").map(parseFloat);

    return products.filter(product => {
      const productPrice = parseFloat(product.gia);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
  };

  const filterProductsByLoai = (products, loaiFilter) => {
    if (loaiFilter === "0") {
      return products;
    }
  
    return products.filter(product => product.id_danhmuc === parseInt(loaiFilter));
  };
  


  
  const sortProductsByOrder = (products, thutuFilter) => {
    switch (thutuFilter) {
      case "0": // Không sắp xếp
        return products;
      case "1": // Mới nhất
        return products.sort((a, b) => new Date(b.ngay_tao) - new Date(a.ngay_tao));
      case "2": // Giá tăng dần
        return products.sort((a, b) => parseFloat(a.gia) - parseFloat(b.gia));
      case "3": // Giá giảm dần
        return products.sort((a, b) => parseFloat(b.gia) - parseFloat(a.gia));
      default:
        return products;
    }
  };

  const filteredProductsByPrice = filterProductsByPrice(productList, priceFilter);
  const filteredProductsByLoai = filterProductsByLoai(filteredProductsByPrice, loaiFilter);
  const sortedAndFilteredProducts = sortProductsByOrder(filteredProductsByLoai, thutuFilter);
  
  return (
    <div className="container-product-show">
      <div className="center-layout">
        {sortedAndFilteredProducts.map((product) => (
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

export default Product;

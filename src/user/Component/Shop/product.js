// Trong component Product
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Product({ priceFilter, thutuFilter }) {
  const [productList, setProductList] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/sanpham/listnew");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductList(data);
        
        data.forEach(product => {
          fetchColors(product.id_sanpham);
        });
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    }

    fetchData();
  }, []);

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
  const sortedAndFilteredProducts = sortProductsByOrder(filteredProductsByPrice, thutuFilter);

  return (
    <div className="container-product-show">
      <div className="center-layout">
        {sortedAndFilteredProducts.map((product) => (
          <div className="product" key={product.id_sanpham}>
            <Link to={`/chitietsanpham/${product.id_sanpham}`} className="product-image">
              <img src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_1}`} alt="" className="main-image" />
              {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                <img src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_2}`} alt="" className="hover-image" />
              )}
              <div className="product-button-container ">
                <button className="buy-now"> Mua Ngay </button>
                <button className="add-to-cart"> Thêm vào giỏ </button>
              </div>
              {product.so_luong === 0 || product.so_luong === null ? (
                <div className="sold-out">Hết hàng</div>
              ) : null}
            </Link>
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
    </div>
  );
}

export default Product;

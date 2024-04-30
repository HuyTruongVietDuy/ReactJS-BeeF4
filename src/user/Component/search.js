import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import ModalProduct from "./modal-addcart";
import ModalProductBuy from "./modal-buy";
import { message } from 'antd';
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const user = useSelector((state) => state.auth.user);

  
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

  const handleInputChange = useCallback(async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/sanpham/listall`);
      if (!response.ok) {
        throw new Error("Error fetching search results");
      }
      const data = await response.json();

      const filteredResults = data.filter((product) =>
        product.ten_sanpham.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, []); // Dependency array trống vì hàm không phụ thuộc vào các giá trị bên ngoài.

  const fetchColors = async (id_sanpham) => {
    try {
      const response = await fetch(`http://localhost:4000/sanpham/colors/${id_sanpham}`);
      if (!response.ok) {
        throw new Error("Error fetching product colors");
      }
      const data = await response.json();
      setColors((prevColors) => ({
        ...prevColors,
        [id_sanpham]: data,
      }));
      setSelectedColor((prevSelectedColors) => ({
        ...prevSelectedColors,
        [id_sanpham]: data[0],
      }));
    } catch (error) {
      console.error("Error fetching product colors:", error);
    }
  };

  const handleColorSelect = (productId, selectedColorId) => {
    const selectedColorObj = colors[productId].find(
      (color) => color.id_mau === selectedColorId
    );
    setSelectedColor((prevSelectedColors) => ({
      ...prevSelectedColors,
      [productId]: selectedColorObj,
    }));
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResults.forEach((product) => {
        fetchColors(product.id_sanpham);
      });
    }
  }, [searchResults]);

  
  
  return (
    <div id="container-main">
      <div className="container-search">
        <h1>Tìm kiếm sản phẩm</h1>
        <div className="box-search-component">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <i className="material-icons">search</i>
        </div>

        <div className="container-product-show">
          <div className="center-layout">
            {searchResults.map((product) => (
              <div className="product" key={product.id_sanpham}>
                <div className="product-image">
                  <Link to={`/chitietsanpham/${product.url_product}`}>
                    <img
                      src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_6}`}
                      alt=""
                      className="main-image"
                    />
                    {selectedColor[product.id_sanpham]?.hinh_anh_2 && (
                      <img
                        src={`http://localhost:4000/chitietsanpham/${selectedColor[product.id_sanpham]?.hinh_anh_2}`}
                        alt=""
                        className="hover-image"
                      />
                    )}
                  </Link>
                  <div className="product-button-container">
                    <button className="buy-now" onClick={() => handleBuy(product.id_sanpham)}>Mua Ngay</button>
                    <button className="add-to-cart" onClick={() => handleAddToCart(product.id_sanpham)}>Thêm vào giỏ</button>
                  </div>
                  <div className="favorite">
                 
                    <i className="material-icons" >favorite</i>
                
                </div>
                  {product.tong_so_luong === 0 || product.tong_so_luong === null ? (
                    <div className="sold-out">Hết hàng</div>
                  ) : null}
                </div>
                <div className="product-details">
                  <div className="container-color">
                    {colors[product.id_sanpham]?.map((color) => (
                      <div
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
                        <span
                          style={{ textDecoration: "line-through", color: "tomato" }}
                        >
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
            {searchResults.length === 0 && (
              <div style={{ textAlign: "center", marginTop: "20px", fontSize: "1.2em" }}>
                Không tìm thấy sản phẩm nào
                <p style={{ textDecoration: "underline", color: "blue", marginTop: "20px" }}>
                  <Link to="/" style={{ color: "blue" }}>quay trở về trang chủ</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalProduct onClose={handleCloseAddToCartModal} show={showAddToCartModal} productId={modalAddCartProductId} />
<ModalProductBuy onClose={handleCloseBuyModal} show={showBuyModal} productId={modalBuyProductId} />
    </div>
  );
};

export default Search;

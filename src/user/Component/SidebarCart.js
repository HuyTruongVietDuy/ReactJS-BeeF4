import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartIconClick } from "../JS Modules/UserClick";
import { XoaSP } from "../../redux/cartSlice";

const SideBarCart = () => {
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();

  // Function to calculate total price and format it to VNĐ
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      const price = product.gia_khuyenmai && product.gia_khuyenmai !== 0 ? product.gia_khuyenmai : product.gia;
      total += price * product.soluong;
    });
    // Format total to VNĐ
    return total.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  return (
    <div id="sidebar-cart">
      <span id="closeButton" onClick={CartIconClick}>
        &times;
      </span>
      <div className="header-cart-search">
        <p>Giỏ hàng của bạn</p>
      </div>

      <div className="clone-items-cart">
        {cart.map((product, index) => (
          <table key={index}>
            <tbody>
              <tr>
                <td id="col-image" rowSpan="5">
                  <img src={`http://localhost:4000/chitietsanpham/${product.hinh_anh_1}`} alt="Product" />
                </td>
                <td id="padding"></td>
              </tr>
              <tr>
                <td id="col-name">{product.ten_sanpham}</td>
              </tr>
              <tr>
                <td id="col-size-color">Size: {product.ten_size} - Màu: {product.ten_mau}</td>
              </tr>
              <tr>
                <td id="col-quanlity-price">
                  <input type="text" defaultValue={product.soluong} readOnly /> <span>{(product.gia_khuyenmai && product.gia_khuyenmai !== 0 ? product.gia_khuyenmai : product.gia).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="5" id="delete-cart">
                <span onClick={() => dispatch(XoaSP({ id_sp: product.id_sp, id_mau: product.id_mau }))}>X</span>

                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      <div className="total-item-cart">
        <span id="left">Total:</span>
        <span id="right">{calculateTotal()}</span>
      </div>

      <div className="container-button">
        <button id="btn-left">
          <Link to="/viewcart" id="Link" onClick={CartIconClick}>
            XEM GIỎ HÀNG
          </Link>
        </button>

        <button id="btn-right">
          <Link to="/thanhtoan" id="Link">
            Thanh Toán
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SideBarCart;

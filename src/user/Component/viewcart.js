import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { XoaSP, SuaSL } from "../../redux/cartSlice";
import { Link } from 'react-router-dom';

const ViewCart = () => {
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();

  // Function to calculate the total price of all items in the cart
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += (product.gia_khuyenmai && product.gia_khuyenmai !== 0) ? product.gia_khuyenmai * product.soluong : product.gia * product.soluong;
    });
    return total;
  };

  // Function to increase quantity
const increaseQuantity = (product) => {
  dispatch(SuaSL({ id_sp: product.id_sp, id_mau: product.id_mau, id_size: product.id_size, soluong: product.soluong + 1 }));
};

// Function to decrease quantity
const decreaseQuantity = (product) => {
  if (product.soluong > 1) {
    dispatch(SuaSL({ id_sp: product.id_sp, id_mau: product.id_mau, id_size: product.id_size, soluong: product.soluong - 1 }));
  }
};


  return (
    <div className="container-cart-user">
      <div className="box">
        <h2>Giỏ hàng</h2>
        <div className="table">
          <table className="table-left">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td className="td td-1">
                    <div className="img">
                      <img src={`http://localhost:4000/chitietsanpham/${product.hinh_anh_1}`} alt={product.name} />
                    </div>
                    <div className="information">
                      <div className="information-name">{product.ten_sanpham}</div>
                      <div className="information-size">Size: {product.ten_size} - Màu: {product.ten_mau}</div>
                      <div className="information-price">
                        {product.gia_khuyenmai && product.gia_khuyenmai !== 0 ?
                          product.gia_khuyenmai.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) :
                          product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </div>
                    </div>
                  </td>
                  <td className="td td-2">
                    <div className="amount">
                      <span className="material-icons" onClick={() => decreaseQuantity(product)}>remove</span>
                      <input type="text" value={product.soluong} readOnly />
                      <span className="material-icons" onClick={() => increaseQuantity(product)}>add</span>
                    </div>
                  </td>
                  <td className="td td-3">
                    {(product.soluong * (product.gia_khuyenmai && product.gia_khuyenmai !== 0 ? product.gia_khuyenmai : product.gia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </td>
                  <td className="td td-4">
                  <i className="material-icons" onClick={() => dispatch(XoaSP({ id_sp: product.id_sp, id_mau: product.id_mau, id_size: product.id_size }))}>delete</i>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-right">
            <div className="total">
              <span>Tổng tiền</span> <span>{calculateTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
            <div className="pay">
            <Link to="/thanhtoan"> <div className="payment"> THANH TOÁN</div></Link>
            </div>
          </div>
        </div>
        <br/>
        <Link to="/shop" className="continue">Tiếp tục mua sắm</Link>
      </div>
    </div>
  );
};

export default ViewCart;

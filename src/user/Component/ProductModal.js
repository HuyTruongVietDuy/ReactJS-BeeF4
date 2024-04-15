import React from "react";

const ProductModal = ({ id_sanpham }) => {
  // Sử dụng id_sanpham ở đây
  console.log(id_sanpham);
  return (
    <div id="notify-add-to-cart" className="notify-add-to-cart">
      Thêm vào giỏ hàng thành công
    
      <span id="close-notify">X</span>
    </div>
  );
};

export default ProductModal;

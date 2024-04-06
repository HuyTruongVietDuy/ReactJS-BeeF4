import React from "react";
import CategoryShow from "./categoryshow";
import SanPhamNew from "./sanphamnew";
import News from './News';
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <div className="user-banner">
        <img src="images/background2.jpg" alt="" />
        <div className="overlay"></div>
        <div className="banner-text">
          <h1>Welcome to Our Website</h1>
          <p>SQ&BE Luôn sẵn sàng phục vụ</p>
          <button> <Link to='/shopall' id='Link'>Mua sắm ngay </Link></button>
        </div>
      </div>
      <CategoryShow />
      <div className="title-new-product">
      <div className="scroll-wrapper">
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
        <div className="scroll-text" >New Arrial</div>
      </div>
    </div>
      <SanPhamNew  />
      <News />
      
      <div className="boxfooter1">
          <p>
            <i className="ti-headphone"></i> Hỗ trợ / Mua hàng:{" "}
            <span>0337 667 418</span>
          </p>
        </div>
    </div>
  );
}

export default Home;

import React from "react";
import CategoryShow from "./categoryshow";
import SanPhamNew from "./sanphamnew";
import News from './News';
function Home() {
  return (
    <div>
      <div className="user-banner">
        <img src="images/background2.jpg" alt="" />
        <div className="overlay"></div>
        <div className="banner-text">
          <h1>Welcome to Our Website</h1>
          <p>SQ&BE Luôn sẵn sàng phục vụ</p>
        </div>
      </div>
      <CategoryShow />
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

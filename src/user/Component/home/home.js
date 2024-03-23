import React from "react";
import CategoryShow from "./categoryshow";
import SanPhamNew from "./sanphamnew";

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
    </div>
  );
}

export default Home;

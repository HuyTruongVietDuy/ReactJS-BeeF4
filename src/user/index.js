import React, { useState, useEffect } from "react";
import { FacebookProvider, Page } from "react-facebook";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";




import {
  SearchIconClick,
  CartIconClick,
  
} from "./JS Modules/UserClick";

import UserHeaderCenter from "./menu.js";
import SideBarCart from "./SidebarCart.js";
import SideBarSearch from "./SidebarSearch.js";
import ProductModal from "./Component/ProductModal.js";
import MainContent from "./Routers.js"; // Import your MainContent component here

import "./CSS Modules/style.css";
import "./CSS Modules/header.css";
import "./CSS Modules/home.css";
import "./CSS Modules/shop.css";
import "./CSS Modules/footer.css";
import "./CSS Modules/dangnhap.css";
import "./CSS Modules/dangky.css";
import "./CSS Modules/forgotpassword.css";
import "./CSS Modules/lienhe.css";
import "./CSS Modules/viewcart.css";
import "./CSS Modules/chitietsanpham.css";
import "./CSS Modules/chitietsanphamv2.css";
import "./CSS Modules/Chitietdonhang.css";
import "./CSS Modules/thanhtoan.css";
import "./CSS Modules/login-admin.css";
import "./CSS Modules/userdetail.css";
import "./CSS Modules/gioithieu.css";
import "./CSS Modules/thanhtoansucces.css";
import "./CSS Modules/baiviet.css";
import "./CSS Modules/chitietbaiviet.css";

function UserIndex() {
  const [loading, setLoading] = useState(true); // State to manage loading
  const daDangNhap = useSelector(state => state.auth.daDangNhap);

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.listSP);


  useEffect(() => {
    // Kiểm tra nếu trình duyệt hỗ trợ navigator.connection
    if ('connection' in navigator) {
      // Lấy thông tin về tốc độ mạng hiện tại
      const connection = navigator.connection;
      const speedMbps = connection.downlink; // Tốc độ mạng được tính bằng Mbps

      // Tính toán thời gian hiển thị của Loader dựa trên tốc độ mạng
      const timeToShowLoader = speedMbps < 2 ? 2000 : 1000; // Nếu tốc độ mạng dưới 2 Mbps, hiển thị Loader trong 2 giây, ngược lại hiển thị trong 1 giây

      // Set timeout để tắt Loader sau khoảng thời gian được tính toán
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, timeToShowLoader);

      // Xóa timeout khi component bị unmounted hoặc tốc độ mạng thay đổi
      return () => clearTimeout(timeoutId);
    } else {
      // Nếu trình duyệt không hỗ trợ navigator.connection, chỉ đơn giản tắt Loader sau 1 giây
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  // var prevScrollpos = window.pageYOffset;
  // var headers = document.getElementsByClassName("user-container-header");

  // window.onscroll = function () {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     for (var i = 0; i < headers.length; i++) {
  //       headers[i].style.top = "0";
  //     }
  //   } else {
  //     for (var i = 0; i < headers.length; i++) {
  //       headers[i].style.top = "-20px";
  //     }
  //   }
  //   prevScrollpos = currentScrollPos;
  // };

  return (
    <div>
      <div className="user-container-header">
        {/* <div className="user-header-top">
          <p style={{fontSize:'0.9vw', fontWeight:'100'}}>hotline:0337-667418</p>
          <p style={{fontSize:'0.9vw',fontWeight:'100'}}>Hân Hạnh</p>
          <p style={{fontSize:'0.9vw',fontWeight:'100'}}>Kính Chào</p>
          <p style={{fontSize:'0.9vw',fontWeight:'100'}}>Qúy Khách</p>
        </div> */}
        <header id="user-header">
          <div className="user-header-left">
            <div className="user-logo-header">
              <Link to="/">
                {" "}
                <img src={process.env.PUBLIC_URL + "/images/SQBE Logo-white.png"} alt="" />
               
              </Link>
            </div>
          </div>
          <UserHeaderCenter />

          <div className="user-header-right">
          <ul className="user-menu">
        {daDangNhap ? (
          <>
            <li  >
              <Link to='/user'><i className="material-icons">person</i></Link>
            </li>
            <li  >
            <Link to={`/sanphamyeuthich/${user ? user.id_user : ''}`}>
  <i className="material-icons">favorite</i>
</Link>

            </li>
          </>
        ) : (
          <li>
            <Link to="/dangnhap">Đăng Nhập /</Link>
            <Link to="/dangky">Đăng Ký</Link>
          </li>
        )}
        <li>
          <Link to="#" onClick={SearchIconClick}>
            <i className="material-icons" id="iccon-zoom-center">
              search
            </i>
          </Link>
        </li>
        <li >
        <Link to="#" >
          <div id='user-box-cart'>
            
          <i className="material-icons" id="iccon-zoom-center" onClick={CartIconClick}>
              shopping_cart
            </i>
            <div id='count-cart'>  ( {cart.length} ) </div>
          </div>
      
          </Link>
           
         
        </li>
      </ul>
          </div>
        </header>
      </div>

      <SideBarSearch onClick={SearchIconClick}/>
    

      <SideBarCart CartIconClick={CartIconClick} />
      <ProductModal />

      <MainContent loading={loading} />

      <footer>
        <div className="footer-left">
          <p>Địa chỉ cửa hàng</p>
          <ul>
            <li> V/N: Công viên PMQT Quận 12, TP. HCM</li>
            <li> V/N: 1059 Quang Trung, Gò Vấp, TP. HCM</li>
            <li>Site Map</li>
          </ul>
        </div>
        <div className="footer-center">
          <p>Chinh sách</p>
          <ul>
            <li> Chính sách bảo mật</li>
            <li> FAQ</li>
            <li>Chính sách bảo hành & đổi trả</li>
            <li>Chính sách thẻ thành viên</li>
            <li>Chính sách giao hàng hỏa tốc</li>
          </ul>
        </div>
        <div className="footer-right">
          <p>Mạng xã hội</p>
          <ul>
            <li>
              {" "}
              <span className="material-icons">facebook</span>{" "}
            </li>
            <li>
              <i className="material-icons">play_circle_filled</i>{" "}
            </li>
            <li>
              {" "}
              <span className="material-icons">alternate_email</span>{" "}
            </li>
          </ul>
          <br />
          <div id="FacebookProvider">
            <FacebookProvider appId="YOUR_APP_ID">
              <Page
                href="https://www.facebook.com/profile.php?id=100084162947803"
                tabs="timeline"
                width="320"
                height="0"
              />
            </FacebookProvider>
          </div>
        </div>
        <div className="footer-bottom">
          <p>@ Team ‘ Bee F4 ’ for with love</p>
        </div>
      </footer>
    </div>
  );
}

export default UserIndex;

import React, { useState } from "react";
import { FacebookProvider, Page } from "react-facebook";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thoat } from "../redux/authSlice.js";
import { message } from 'antd';

import {
  SearchIconClick,
  CartIconClick,
  
} from "./JS Modules/UserClick";

import UserHeaderCenter from "./menu.js";
import SideBarCart from "./SidebarCart.js";
import SideBarSearch from "./SidebarSearch.js";
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
import "./CSS Modules/Chitietdonhang.css";
import "./CSS Modules/thanhtoan.css";
import "./CSS Modules/login-admin.css";
import "./CSS Modules/userdetail.css";
import "./CSS Modules/gioithieu.css";
function UserIndex() {
  const [loading, setLoading] = useState(true); // State to manage loading
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Thực hiện các bước cần thiết để đăng xuất, có thể dispatch action thoat
    dispatch(thoat());
    message.success('Đăng xuất thành công');
    window.location.reload();
  };

  setTimeout(() => {
    setLoading(false);
  }, 1200);

  var prevScrollpos = window.pageYOffset;
  var headers = document.getElementsByClassName("user-container-header");

  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      for (var i = 0; i < headers.length; i++) {
        headers[i].style.top = "0";
      }
    } else {
      for (var i = 0; i < headers.length; i++) {
        headers[i].style.top = "-20px";
      }
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <div>
      <div className="user-container-header">
        <div className="user-header-top">
          <p style={{fontSize:'0.9vw', fontWeight:'100'}}>SQBE</p>
          <p style={{fontSize:'0.9vw',fontWeight:'100'}}>Hân Hạnh</p>
          <p style={{fontSize:'0.9vw',fontWeight:'100'}}>Kính Chào</p>
          <p style={{fontSize:'0.9vw',fontWeight:'100'}}>Qúy Khách</p>
        </div>
        <header id="user-header">
          <div className="user-header-left">
            <div className="user-logo-header">
              <Link to="/">
                {" "}
                <img src={process.env.PUBLIC_URL + "/images/logo-header.gif"} alt="" />

              </Link>
            </div>
          </div>
          <UserHeaderCenter />

          <div className="user-header-right">
          <ul className="user-menu">
        {daDangNhap ? (
          <>
            <li style={{cursor:'pointer',fontWeight:"bold"}} >
              <Link to='/user'><i className="material-icons">person</i></Link>
            </li>
            <li style={{cursor:'pointer'}}>
              <i className="material-icons">favorite</i>
            </li>
          </>
        ) : (
          <li>
            <a href="/dangnhap">Đăng Nhập</a><span>/ </span>
            <a href="/dangky">Đăng Ký</a>
          </li>
        )}
        <li>
          <p onClick={SearchIconClick}>
            <i className="material-icons" id="iccon-zoom-center">
              search
            </i>
          </p>
        </li>
        <li>
          <p onClick={CartIconClick}>
            <i className="material-icons" id="iccon-zoom-center">
              shopping_cart
            </i>
          </p>
        </li>
      </ul>
          </div>
        </header>
      </div>

      <SideBarSearch onClick={SearchIconClick}/>
    

      <SideBarCart CartIconClick={CartIconClick} />

      <div id="notify-add-to-cart" className="notify-add-to-cart">
        Thêm vào giỏ hàng thành công!
        <span id="close-notify">X</span>
      </div>

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

import React from 'react';

const LienHe = () => {
  return (
    <div id="container-main">
     <div className="container-lienhe">
     <div className="content">
     <div className="content-1">
          <h2>LIÊN HỆ</h2>
          <div className="box">
            <div className="box-left">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435924064655!2d106.62525347377597!3d10.85382635776386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1709548305677!5m2!1svi!2s"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div class="box-right">
              <div class="box-right-0 box-right-1">
                <i class="fa-solid fa-location-dot"></i>
                Địa chỉ của chúng tôi
                <p><a href="#/">Công viên Quan Trung, Quận 12, TP .HCM</a></p>
              </div>
              <div class="box-right-0 box-right-2">
                <i class="fa-solid fa-envelope"></i>
                Email
                <p><a href="#/">SQ&BE@gmail.com</a></p>
              </div>
              <div class="box-right-0 box-right-3">
                <i class="fa-solid fa-phone"></i>
                Số điện thoại
                <p><a href="#/">012345678</a></p>
              </div>
              <div class="box-right-0 box-right-4">
                <i class="fa-brands fa-tiktok"></i>
                Tiktok
                <p><a href="#/">https://www.tiktok.com/@huy_not_rotws</a></p>
              </div>
              <div class="box-right-0 box-right-5">
                <i class="fa-brands fa-facebook"></i>
                Fanpage
                <p><a href="#/">https://www.tiktok.com/@huy_not_rotws</a></p>
              </div>
              <div class="box-right-0 box-right-6">
                <i class="fa-solid fa-clock"></i>
                Thời gian làm việc
                <p>8pm - 5pm</p>
              </div>
            </div>
          </div>
        
        </div>
     </div>
     <div class="content-2">
          <h2>GỬI THẮC MẮC CHO CHÚNG TÔI</h2>
          <form action="">
            <input type="text" placeholder="Họ và tên" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Số điện thoại" />
            <textarea name="" id="" cols="20" rows="10" placeholder="Nội dung"></textarea>
            <p></p>
            <button>GỬI CHO CHÚNG TÔI</button>
          </form>
        </div>
     </div>
    </div>
  );
};

export default LienHe;

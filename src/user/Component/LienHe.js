import React from 'react';

const LienHe = () => {
  return (
    <div id="container-main">
      <div className="header-lienhe">
        <h1>Liên Hệ Với Chúng Tôi</h1>
      </div>

      <div className='container-lienhe'>
        <div className="main-content-lienhe">
          <div className="contact-info-lienhe">
            <h2>Thông tin</h2>
            <p>Địa chỉ : V/N: Công viên PMQT Quận 12, TP. HCM</p>
            <p>Email chúng tôi : SQ&BE@gmail.com</p>
            <p>Số điện thoại: 0123 456 789</p>
            <p>Tiktok : <a href="https://www.tiktok.com/@huy_not_rotws">https://www.tiktok.com/@huy_not_rotws</a></p>
            <p>Fanpage: <a href="https://www.facebook.com/congtyabc">Công Ty ABC</a></p>
            <p>Thời gian làm việc : 8pm - 9pm</p>
          </div>

          <div className="map-container-lienhe">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435924064655!2d106.62525347377597!3d10.85382635776386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1709548305677!5m2!1svi!2s" width="600" height="450" style={{ border: "0;" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

        
        </div>
        <div className="contact-form-lienhe">
       

        <form>
        <h2>Gửi thắc mắc cho chúng tôi</h2>
          <label htmlFor="name">Họ và Tên</label>
          <input type="text" id="name" name="name" placeholder="Nhập họ và tên của bạn" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Nhập email của bạn" required />

          <label htmlFor="message">Nội dung</label>
          <textarea id="message" name="message" rows={5} placeholder="Nội dung bạn muốn gửi đến chúng tôi"></textarea>
          <br/>
          <input type="submit" value="Gửi cho chúng tôi" />
          <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default LienHe;

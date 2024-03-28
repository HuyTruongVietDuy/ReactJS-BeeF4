import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const QuenMatKhau = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to control form submission status
  const [submittedEmail, setSubmittedEmail] = useState(''); // State to store submitted email

  const handleSubmit = async (e) => {
    e.preventDefault();
    message.info(' Vui lòng đợi...', 2);
    try {
 
      const response = await axios.post('http://localhost:4000/taikhoan/forgot-password', { email });
      
    
      
      console.log(response.data.message);
      setSubmittedEmail(email);
      setEmail('');
      setSubmitted(true);

      message.success('Gửi vào địa chỉ email thành công');
    } catch (error) {
      console.error('Error:', error);
      // Handle other error scenarios here
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div id="container-main">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-quenmatkhau">
          <h2 className="recover">Phục hồi mật khẩu</h2>
          <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
          <div className="box">
            <button type="submit" className="box__sign-in">Gửi</button>
            <button type="reset" className="box__close">Hủy</button>
          </div>
        </form>
      ) : (
        <p style={{textAlign:'center', fontWeight:'bold', margin:"200px 0", fontSize:'1.2vw'}}>Bạn đã gửi email vào địa chỉ: {submittedEmail}. Vui lòng kiểm tra email và xác nhận.</p>
      )}

      <div className="title-new-product" style={{ marginTop: '150px' }}>
        <div className="scroll-wrapper">
          <div className="scroll-text">Forget Account</div>
          <div className="scroll-text">Forget Account</div>
          <div className="scroll-text">Forget Account</div>
          <div className="scroll-text">Forget Account</div>
          <div className="scroll-text">Forget Asccount</div>
        </div>
      </div>
    </div>
  );
};

export default QuenMatKhau;

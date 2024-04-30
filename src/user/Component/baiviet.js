import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BaiViet = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://api.sqbe.store/baiviet/listbaiviet')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div id='container-main'>
      <div className="container-baiviet">
        <div className="content">
          <h1>BÀI VIẾT</h1>
          <div className="box">
          {posts.map((post, index) => {
    // Kiểm tra nếu trạng thái của bài viết là 2
    if (post.trang_thai === 2) {
        return (
            <div className="box-0" key={index}>
                <div className="img">
              
                 
                        <img src={`https://api.sqbe.store/danhmuc/uploads/${post.hinhanh}`} alt='' />
                  
               
                </div>
                <h3 className="tieude">{post.tieude}</h3>
                <div className="thoigian">{post.date}</div>
                {/* <div className="noidung">{post.textare}</div> */}
                <Link to={`/baiviet/${post.url_baiviet}`}><button>Xem thêm</button> </Link>
            </div>
        );
    }
    return null; // Nếu không thì trả về null (không render gì)
})}


          </div>
        </div>
      </div>
    </div>
  );
};

export default BaiViet;

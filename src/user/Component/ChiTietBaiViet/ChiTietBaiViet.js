import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import BaiVietRanDom from './baivietrandom'
import BaiVietChildren from './baivietchilren';
const ChiTietBaiViet = () => { 
  const { url_baiviet } = useParams();
  const [baiviet, setBaiviet] = useState(null);

  useEffect(() => {
    // Fetch dữ liệu của bài viết dựa trên url_baiviet từ API
    fetch(`https://api.sqbe.store/baiviet/url/${url_baiviet}`)
        .then(response => response.json())
        .then(data => {
            // Lưu trữ dữ liệu của bài viết vào state
            setBaiviet(data);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, [url_baiviet]);
  return (
    <div id='container-main'>
      <div className="container-baivietct">
      
        <div className="content">
          
        <div className="box-1">
        {baiviet && <h1>{baiviet.tieude}</h1>}
        <ReactQuill
  value={baiviet && baiviet.textare ? baiviet.textare : ''}
  readOnly={true}
  theme="snow"
/>

    <BaiVietRanDom/>
        </div>

        <div className="box-2">
      <h2>Tìm kiếm</h2>
          <div className="search">
            <input type="text" placeholder="Tìm kiếm..." />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <BaiVietChildren/>
      </div>
        </div>
     
     
      </div>
    </div>
  );
};

export default ChiTietBaiViet;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const News = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      fetch('https://api.sqbe.store/baiviet/listbaiviet')
          .then(response => response.json())
          .then(data => {
              // Assuming data is an array of posts, slice it to get the first three posts
              const firstThreePosts = data.slice(0, 3);
              setPosts(firstThreePosts);
          })
          .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div className='Container-new'>
    <h1> NEWS SQ&BE </h1>
      <div className='Container-News'>
      {posts.map((post, index) => (
      <div className='Box-New' key={index}>
      <div className='Image-New'> <img src={`https://api.sqbe.store/danhmuc/uploads/${post.hinhanh}`} alt='' /></div>
      <div className='Read-New'>Đọc Ngay</div>
      <div className='Name-New'><Link to={`/baiviet/${post.url_baiviet}`}>{post.tieude}</Link></div>
      </div>
  ))}
      
      </div>
    
    </div>
  );
};

export default News;

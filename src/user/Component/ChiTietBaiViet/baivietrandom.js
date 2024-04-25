import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BaiVietRanDom = () => { 
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
    <div className="baivietlienquan">
        <h3>BÀI VIẾT LIÊN QUAN</h3>
        
        <div className="baiviet">
            {/* Map through the posts and render each one */}
            {posts.map((post, index) => (
                  post.trang_thai === 2 && (
                <div key={index}>
                <div  className='baiviet-0'>
                     <Link to={`/baiviet/${post.url_baiviet}`}>
                   <img src={`https://api.sqbe.store/danhmuc/uploads/${post.hinhanh}`} alt='' />
                    {post.tieude}
                    </Link>
                </div>
                </div>
             )
            ))}
        </div>
    </div>
  );
};

export default BaiVietRanDom;

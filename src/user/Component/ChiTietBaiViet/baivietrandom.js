import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BaiVietRanDom = () => { 
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/baiviet/listbaiviet')
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
                <div key={index} className={`baiviet-${index}`}>
                     <Link to={`/baiviet/${post.url_baiviet}`}>
                   <img src={`http://localhost:4000/danhmuc/uploads/${post.hinhanh}`} alt='' />
                    {post.tieude}
                    </Link>
                </div>
             )
            ))}
        </div>
    </div>
  );
};

export default BaiVietRanDom;

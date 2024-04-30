import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BaiVietChildren = () => { 
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://api.sqbe.store/baiviet/listbaiviet')
            .then(response => response.json())
            .then(data => {
                // Set 'posts' to the data returned from the API
                setPosts(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to run effect only once on component mount
  
  
    return (
        <div>
            <ul>
                {/* Map through the 'posts' array to display the titles */}
                {posts.map((post, index) => (
                    // Check if 'trang_thai' is 2 before rendering the link
                    post.trang_thai === 2 && (
                        <Link to={`/baiviet/${post.url_baiviet}`} key={index}>
                            <li>{post.tieude}</li>
                        </Link>
                    )
                ))}
            </ul>
        </div>
    );
};

export default BaiVietChildren;

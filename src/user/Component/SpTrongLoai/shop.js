import React, { useState, useEffect } from 'react';
import SanPham from "./product";
import { Link, useParams } from "react-router-dom";

function Shop({ addToCart }) {
    const { url_category } = useParams();
    const [thutuFilter, setThutuFilter] = useState("0");
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        // Fetch danh mục theo url_category
        fetch(`http://localhost:4000/danhmuc/${url_category}`)
            .then(response => response.json())
            .then(data => {
                // Kiểm tra xem danh sách danh mục tồn tại và là một mảng
                if (data && Array.isArray(data.danhMucList)) {
                    // Cập nhật state với danh sách danh mục
                    setCategories(data.danhMucList);
                } else {
                    console.error('Invalid categories data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [url_category]); // Thêm url_category vào dependencies để useEffect được gọi lại khi url_category thay đổi
    

    const handleThutuFilterChange = (event) => {
        setThutuFilter(event.target.value);
    };


    return (
        <div>
            <div className="container-category__in">
               
                {/* Hiển thị danh sách danh mục */}
                {categories.length >= 4 && categories.every(category => category.hinhanh) && categories.map((category, index) => (
                <div key={index} className='box-category'>
                    <div className='box-img'>
                        <img src={`http://localhost:4000/danhmuc/uploads/${category.hinhanh}`} alt={category.ten_danhmuc}/>
                    </div>
                    <div className='box-name'>{category.ten_danhmuc}</div>
                    <div></div>
                </div>
            ))}

            </div>
          
            <nav className='nav-product'>
                <div className='Container-item-nav'  style={{borderBottom:"none"}}>
                <div className='item-left-right'>
                      <h1>Sản Phẩm loại: {url_category}</h1>
                    </div>
                    <div className='item-nav-right'>
                        {/* Dropdown để lọc sản phẩm */}
                        <select id="thutuFilter" onChange={handleThutuFilterChange} value={thutuFilter}>
                            <option value="0">Thứ Tự</option>
                            <option value="1">Mới Nhất</option>
                            <option value="2">Giá Tăng Dần</option>
                            <option value="3">Giá Giảm Dần</option>
                        </select>
                    </div>
                </div>
            </nav>

            {/* Truyền các giá trị lọc vào component SanPham */}
            <SanPham thutuFilter={thutuFilter} />
        </div>
    );
}

export default Shop;

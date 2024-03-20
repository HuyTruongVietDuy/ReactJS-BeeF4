import React, { useState } from 'react';
import SanPham from "./product";

function Shop({ addToCart }) {
    const [priceFilter, setPriceFilter] = useState("0");
    const [loaiFilter, setLoaiFilter] = useState("0");
    const [colorFilter, setColorFilter] = useState("0");
    const [thutuFilter, setThutuFilter] = useState("0");

    // Hàm xử lý sự kiện khi giá trị của các dropdown thay đổi
    const handlePriceFilterChange = (event) => {
        setPriceFilter(event.target.value);
    };

    const handleLoaiFilterChange = (event) => {
        setLoaiFilter(event.target.value);
    };

    const handleColorFilterChange = (event) => {
        setColorFilter(event.target.value);
    };

    const handleThutuFilterChange = (event) => {
        setThutuFilter(event.target.value);
    };

    return (
        <div>
            <div className='background-Product'>
                <video autoPlay loop muted>
                    <source src="./images/3003166451.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
           
            <nav className='nav-product'>
                <div className='Container-item-nav'>
                    <div className='item-nav-left'>
                        <select id="priceFilter" onChange={handlePriceFilterChange} value={priceFilter}>
                            <option value="0">Lọc Giá</option>
                            <option value="0-100000">Dưới 100,000 VND</option>
                            <option value="100000-300000">100,000 VND - 300,000 VND</option>
                            <option value="300000-500000">300,000 VND - 500,000 VND</option>
                            <option value="500000-800000">500,000 VND - 800,000 VND</option>
                            <option value="800000+">Trên 800,000 VND</option>
                        </select>

                        <select id="loaiFilter" onChange={handleLoaiFilterChange} value={loaiFilter}>
                            <option value="0">Loại</option>
                            <option value="1">Tên loại 1</option>
                            <option value="2">Tên loại 2</option>
                            <option value="3">Tên loại 3</option>
                            <option value="4">Tên loại 4</option>
                        </select>

                        <select id="colorFilter" onChange={handleColorFilterChange} value={colorFilter}>
                            <option value="0">Màu Sắc</option>
                            <option value="1">Đỏ</option>
                            <option value="2">Hồng</option>
                            <option value="3">Tím</option>
                            <option value="4">Vàng</option>
                            <option value="5">Xanh</option>
                        </select>
                    </div>
                    
                    <div className='item-nav-right'>
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
            <SanPham 
                addToCart={addToCart}
                priceFilter={priceFilter}
                loaiFilter={loaiFilter}
                colorFilter={colorFilter}
                thutuFilter={thutuFilter}
            />
        </div>
    );
}

export default Shop;

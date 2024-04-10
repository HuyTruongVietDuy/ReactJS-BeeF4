import React, { useState, useEffect } from 'react';
import SanPham from "./product";

function Shop() {
    const [priceFilter, setPriceFilter] = useState("0");
    const [loaiFilter, setLoaiFilter] = useState("0");
    const [colorFilter, setColorFilter] = useState("0");
    const [thutuFilter, setThutuFilter] = useState("0");
    const [categories, setCategories] = useState([]);
    const [selectedPriceOption, setSelectedPriceOption] = useState(null);
    const [selectedLoaiOption, setSelectedLoaiOption] = useState(null);
    const [selectedColorOption, setSelectedColorOption] = useState(null);
    const [selectedThutuOption, setSelectedThutuOption] = useState(null);
   
    useEffect(() => {
        fetch('http://localhost:4000/danhmuc/list')
            .then(response => response.json())
            .then(data => {
                // Check if danhMucList exists and is an array
                if (data && Array.isArray(data.danhMucList)) {
                    // Update state with danhMucList
                    setCategories(data.danhMucList);
                } else {
                    console.error('Invalid categories data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    


    
    // Hàm xử lý sự kiện khi giá trị của các dropdown thay đổi
    const handlePriceFilterChange = (event) => {
        setPriceFilter(event.target.value);
        setSelectedPriceOption(event.target[event.target.selectedIndex].text);
    };

    const handleLoaiFilterChange = (event) => {
        setLoaiFilter(event.target.value);
        setSelectedLoaiOption(event.target[event.target.selectedIndex].text);
    };

    const handleColorFilterChange = (event) => {
        setColorFilter(event.target.value);
        setSelectedColorOption(event.target[event.target.selectedIndex].text);
    };

    const handleThutuFilterChange = (event) => {
        setThutuFilter(event.target.value);
        setSelectedThutuOption(event.target[event.target.selectedIndex].text);
    };


    return (
        <div>
            <div className='background-Product'>
                <video autoPlay loop muted>
                    <source src="./images/3003166451.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
           
            <div className='nav-top-product'>
            {selectedPriceOption && selectedPriceOption !== "Lọc Giá" && (
                <div className='choose' >
                    <div className='choose-top'><span> Select </span></div>
                    <div className='choose-bottom' style={{background:"#FF5733"}}>{selectedPriceOption}</div>
                </div>
            )}

            {selectedLoaiOption && selectedLoaiOption !== "Loại" && (
                <div className='choose' >
                    <div className='choose-top'><span> Select </span></div>
                    <div className='choose-bottom' style={{background:"#FFC300"}}>{selectedLoaiOption}</div>
                </div>
            )}

            {selectedColorOption && selectedColorOption !== "Màu Sắc" && (
                <div className='choose' >
                    <div className='choose-top'><span> Select </span></div>
                    <div className='choose-bottom' style={{background:"#C70039"}}>{selectedColorOption}</div>
                </div>
            )}

            {selectedThutuOption && selectedThutuOption !== "Thứ Tự" && (
                <div className='choose'>
                    <div className='choose-top'><span> Select </span></div>
                    <div className='choose-bottom' style={{background:"#900C3F"}}>{selectedThutuOption}</div>
                </div>
            )}
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
                           
                            {categories.filter(category => category.id_danhmuc_cha).map(category => (
    <option key={category.id_danhmuc} value={category.id_danhmuc}>{category.ten_danhmuc}</option>
))}

                        </select>

                        <select id="colorFilter" onChange={handleColorFilterChange} value={colorFilter}>
                            <option value="0">Màu Sắc</option>
                            <option value="đen">Đen</option>
                            <option value="trắng">Trắng</option>
                            <option value="đỏ">Đỏ</option>
                            <option value="xám">Xám</option>
                            <option value="vàng">Vàng</option>
                            <option value="xanh">Xanh</option>
                            <option value="xanh lá">Xanh lá</option>
                            <option value="hồng">hồng</option>
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
                priceFilter={priceFilter}
                loaiFilter={loaiFilter}
                colorFilter={colorFilter}
                thutuFilter={thutuFilter}
            />
        </div>
    );
}

export default Shop;
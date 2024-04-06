import React, { useState, useEffect } from 'react';
import SanPham from "./product";

function Shop({ addToCart }) {
  
    const [thutuFilter, setThutuFilter] = useState("0");
    const [categories, setCategories] = useState([]);
    
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
    

    const handleThutuFilterChange = (event) => {
        setThutuFilter(event.target.value);
       
    };


    return (
        <div>
          
          <div className="container-category__in">
            
            </div>
          
            <nav className='nav-product'>
           
                <div className='Container-item-nav'  style={{borderBottom:"none"}}>
              
                 
                    <div className='item-nav-left'>
                    

                     
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
            <SanPham  thutuFilter={thutuFilter} />
        </div>
    );
}

export default Shop;

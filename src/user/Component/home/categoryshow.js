import React, { useState, useEffect, useCallback } from 'react';

function CategoryShow() {
    const [chiSoHienTai, setChiSoHienTai] = useState(0);
    const [tongSoDanhMuc, setTongSoDanhMuc] = useState(0);
    const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/danhmuc/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
            
                const danhMucList = data.danhMucList.filter(danhMuc => danhMuc.id_danhmuc_cha !== null); // Chỉ lấy các mục có id_danhmuc_cha khác null
                setTongSoDanhMuc(danhMucList.length);
                setDanhSachDanhMuc(danhMucList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const chuyenDenDanhMucKeTiep = useCallback(() => {
        setChiSoHienTai((chiSoTruocDo) => (chiSoTruocDo + 1) % tongSoDanhMuc);
    }, [tongSoDanhMuc]);

    const chuyenDenDanhMucTruocDo = useCallback(() => {
        setChiSoHienTai((chiSoTruocDo) => (chiSoTruocDo - 1 + tongSoDanhMuc) % tongSoDanhMuc);
    }, [tongSoDanhMuc]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            chuyenDenDanhMucKeTiep();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [chuyenDenDanhMucKeTiep]);

    return (
        <div className='container-slide'>
            <div className='container-left'>
                <h1> Danh Mục SQ&BE</h1>
            </div>
            <div className="container-right">
                <div className="container">
                    <div className="categories-container" id="categoriesContainer">
                    {danhSachDanhMuc.map((danhMuc, index) => 
                        // Kiểm tra nếu trạng thái là hiện và không có id danh mục cha
                        danhMuc.trang_thai === 2 && (
                            <div className={`category ${index >= chiSoHienTai && index < chiSoHienTai + 6 ? 'active' : 'previous'}`} key={danhMuc.id_danhmuc}>
                                <div className="image-category"><img src={`http://localhost:4000/danhmuc/uploads/${danhMuc.hinhanh}`} alt=''/></div>
                                <div className="name-category">{danhMuc.ten_danhmuc}</div>
                            </div>
                        )
                    )}
                    
                    
                    </div>
                    <div className="button-container">
                        <button onClick={chuyenDenDanhMucTruocDo} id="button-left">
                            <i className="material-icons">keyboard_arrow_left</i>
                        </button>
                        <button onClick={chuyenDenDanhMucKeTiep} id="button-right">
                            <i className="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryShow;

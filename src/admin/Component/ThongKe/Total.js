import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const CountQuantity = () => {
    const [data, setData] = useState(0);
    useEffect(() => {
        // Địa chỉ endpoint API bạn muốn gọi
        const apiUrl = "http://localhost:4000/thongke/total";
    
        // Gọi API sử dụng fetch
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            // Lưu trữ dữ liệu lấy về từ API vào state
            setData(data);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
    }, []);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
      return (
        <div className="count-total">
            <div id='box' style={{border:'1px solid rgb(13, 123, 233)'}}>
                <div id='top' style={{backgroundColor:'rgb(13, 123, 233)'}}>
                    <div className="left">
                        <i className="material-icons">monetization_on</i>
                    </div>
                    <div className="right">
                        <div className="top"  style={{fontSize:'1.2vw'}}>{formatPrice(data.totalDonHang)}</div>
                        <div className="bottom">Doanh Thu</div>
                    </div>
                </div>
                <div id='bottom'>
                    <a href="/%" style={{color:'rgb(13, 123, 233)'}}> Xem chi tiết</a>
                </div>
            </div>
            
            <div id='box' style={{border:'1px solid rgb(19, 219, 119)'}}>
                <div id='top' style={{backgroundColor:'rgb(19, 219, 119)'}}>
                    <div className="left">
                        <i className="material-icons">shopping_cart</i>
                    </div>
                    <div className="right">
                        <div className="top" style={{fontSize:'2.4vw'}}>{data.totalSanPham} </div>
                        <div className="bottom">Sản phẩm</div>
                    </div>
                </div>
                <div id='bottom'>
                    <a href="/%" style={{color:'rgb(19, 219, 119)'}}> Xem chi tiết</a>
                    {/* Hiển thị Tooltip khi hover vào biểu tượng cảnh báo */}
                    {data.lowStockProducts !== 0 && (
    <Tooltip title={`Có ${data.lowStockProducts} sản phẩm sắp hết hàng`}>
        <div id='info-total' style={{ display: 'inline-block' }}>
        <ExclamationCircleOutlined style={{ fontSize: '1.2rem', color: 'gold' }} />
        </div>
    </Tooltip>
)}

                </div>
            </div>

            <div id='box' style={{border:'1px solid rgb(237, 191, 5)'}}>
                <div id='top' style={{backgroundColor:'rgb(237, 191, 5)'}}>
                    <div className="left">
                        <i className="material-icons">category</i>
                    </div>
                    <div className="right">
                        <div className="top" style={{fontSize:'2.4vw'}}>{data.totalDanhMuc} </div>
                        <div className="bottom">Danh mục</div>
                    </div>
                </div>
                <div id='bottom'>
                    <a href="/%" style={{color:'rgb(237, 191, 5)'}}> Xem chi tiết</a>
                </div>
            </div>

            <div id='box' style={{border:'1px solid rgb(229, 40, 6)'}}>
                <div id='top' style={{backgroundColor:' rgb(229, 40, 6)'}}>
                    <div className="left">
                        <i className="material-icons">person</i>
                    </div>
                    <div className="right">
                        <div className="top" style={{fontSize:'2.4vw'}}>{data.totalNguoiDung} </div>
                        <div className="bottom">Tài khoản</div>
                    </div>
                </div>
                <div id='bottom'>
                    <a href="/%" style={{color:' rgb(229, 40, 6)'}}> Xem chi tiết</a>
                </div>
            </div>
        </div>
    );
};

export default CountQuantity;

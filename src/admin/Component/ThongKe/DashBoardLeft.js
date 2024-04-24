import React, { useState, useEffect } from "react";
import { Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DashBoardLeft = () => {
    const [latestOrder, setLatestOrder] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/thongke/don-hang-moi-nhat')
            .then(response => response.json())
            .then(data => {
                // Cập nhật state với dữ liệu nhận được từ API
                setLatestOrder(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy đơn hàng mới nhất:', error);
            });
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="dashboard-left">
            <h1>Đơn hàng mới nhất</h1>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th id='fontsize-8vw'>ID</th>
                        <th id='fontsize-8vw'>Người đặt</th>
                        <th id='fontsize-8vw'>Số điện thoại</th>
                        <th id='fontsize-8vw'>Thành tiền</th>
                        <th id='fontsize-8vw'>Tình trạng</th>
                    </tr>
                </thead>
                <tbody>
                    {latestOrder && (
                        <tr>
                            <td id='fontsize-7vw'>{latestOrder.id_donhang}</td>
                            <td id='fontsize-7vw'>{latestOrder.hoten}</td>
                            <td id='fontsize-7vw'>{latestOrder.sdt}</td>
                            <td id='fontsize-7vw'>{formatPrice(latestOrder.total)}</td>
                            <td>
                                <div id='pd-cxl'>
                                    {latestOrder.tinh_trang === 1 ? "Chờ xử lý" : "Khác"}
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DashBoardLeft;

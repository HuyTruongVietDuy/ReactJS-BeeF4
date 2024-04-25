import React, { useRef, useEffect, useState } from "react";
import { Statistic, Row, Col, Card, DatePicker, Button } from "antd";
import "./Dashboard.css"; // Import file CSS tùy chỉnh
import Chart from 'chart.js/auto'; // Import Chart.js
import axios from 'axios';

const DashBoard = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const chartRef = useRef(null); // Tham chiếu đến thẻ canvas

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const fetchData = () => {
        if (!startDate || !endDate) {
            return;
        }
    
        const formattedStartDate = encodeURIComponent(startDate.toISOString());
        const formattedEndDate = encodeURIComponent(endDate.toISOString());
        
        // Gọi API để lấy dữ liệu thống kê
        axios.get(`https://api.sqbe.store/thongke/thong-ke-doanh-thu?start_date=${formattedStartDate}&end_date=${formattedEndDate}`)
            .then(response => {
                const { totalRevenue } = response.data;
                setTotalRevenue(totalRevenue);
                createChart(totalRevenue); // Tạo và vẽ biểu đồ khi nhận được dữ liệu
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu thống kê:', error);
            });
    };

    const createChart = (totalRevenue) => {
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Tổng doanh thu"],
                datasets: [{
                    label: "Doanh thu",
                    data: [totalRevenue],
                    backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                    borderColor: ["rgba(54, 162, 235, 1)"],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <Col span={15}>
            <h1 style={{marginBottom:'10px'}}>Thống kê doanh thu theo ngày được chọn</h1>
            <Row gutter={[18, 20]}>
                <label> bắt đầu: </label> 
                <Col span={[4, 8]}>
                    <DatePicker
                        onChange={handleStartDateChange}
                        placeholder="Chọn ngày bắt đầu"
                    />
                </Col>
                <Col span={[4, 8]}>
                    <label>kết thúc: </label> 
                    <DatePicker
                        onChange={handleEndDateChange}
                        placeholder="Chọn ngày kết thúc"
                    />
                </Col>
                <Col span={4}>
                    <Button onClick={fetchData}>Thống kê</Button>
                </Col>
            </Row>
          
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <canvas ref={chartRef}></canvas> {/* Thẻ canvas để vẽ biểu đồ */}
                </Col>
            </Row>
            {/* Hiển thị các thông tin khác */}
        </Col>
    );
};

export default DashBoard;

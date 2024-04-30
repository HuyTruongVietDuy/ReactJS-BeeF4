import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const DashBoardRight = () => {
    const [monthlyStatistics, setMonthlyStatistics] = useState([]);

    useEffect(() => {
        // Fetch dữ liệu thống kê từ API khi component được mount
        fetch('https://api.sqbe.store/thongke/thong-ke-theo-thang')
            .then(response => response.json())
            .then(data => {
                setMonthlyStatistics(data);
            })
           
    }, []);

    // Xác định dữ liệu cho biểu đồ
    const chartData = {
        labels: monthlyStatistics.map(statistic => statistic.ngay), // Sử dụng 'ngay' hoặc 'tuan' tùy thuộc vào dữ liệu thực tế
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: monthlyStatistics.map(statistic => statistic.tongDonHang),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-right">
            <h1>Thống kê trong tháng</h1>
            <Bar data={chartData} />
        </div>
    );
};

export default DashBoardRight;

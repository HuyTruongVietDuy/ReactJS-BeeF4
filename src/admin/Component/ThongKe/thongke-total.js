import React, { useRef, useEffect, useState } from "react";
import { Statistic, Row, Col, Card } from "antd";
import "./Dashboard.css"; // Import file CSS tùy chỉnh
import Chart from 'chart.js/auto'; // Import Chart.js
import ThongKeTheoDay from './thongke-total-byday';
const DashBoard = () => {
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

  useEffect(() => {
    if (data) {
      // Tạo dữ liệu cho biểu đồ hình tròn
      const chartData = {
        labels: ['Thành công', 'Thất bại', 'Chờ xử lý'],
        datasets: [{
          data: [data.totalDonHangThanhCong, data.totalDonHangChuaThanhCong, data.totalDonHangChoXuLy],
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
            '#FFCE56'
          ],
          hoverOffset: 4
        }]
      };

      // Lấy tham chiếu của canvas để vẽ biểu đồ
      const ctx = document.getElementById('doughnut-chart');

      // Khởi tạo biểu đồ hình tròn
      new Chart(ctx, {
        type: 'doughnut',
        data: chartData
      });
    }
  }, [data]);

  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> Chi tiết thống kê đơn hàng</h1>
        </div>
        <div className="nav-right-admin"></div>
      </div>
      <div className="admin-content-component">
        <Row gutter={16}>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic title="Tổng số đơn hàng" value={data.CountTongDonHang} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic
                title="Đơn hàng giao thành công"
                value={data.totalDonHangThanhCong}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic
                title="Đơn hàng giao thất bại"
                value={data.totalDonHangChuaThanhCong}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic
                title="Đơn hàng đang chờ xử lý"
                value={data.totalDonHangChoXuLy}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "25px" }}>

        <ThongKeTheoDay/>
          <Col span={9}>
            <canvas id="doughnut-chart"></canvas> {/* Canvas để vẽ biểu đồ */}
          </Col>
        </Row>
      </div>
    </div>
  );
};


export default DashBoard;

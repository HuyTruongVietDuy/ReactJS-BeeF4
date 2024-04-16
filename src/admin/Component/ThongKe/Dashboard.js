import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import CountTotal from './Total'
const DashBoard = () => {
  const canvasRef = useRef(null); // Tạo một tham chiếu đến phần tử canvas

  useEffect(() => {
    // Khi component được render, vẽ biểu đồ
    const ctx = canvasRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        datasets: [
          {
            label: "Doanh thu (USD)",
            data: [
              5000, 6000, 7000, 5500, 8000, 7500, 7000, 6500, 6000, 5500, 6000,
              6500,
            ], // Dữ liệu doanh thu cho mỗi tháng trong năm
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Clean up khi component bị unmount
      myChart.destroy();
    };
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được render

  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> DashBoard Admin</h1>
        </div>
        <div className="nav-right-admin">
          {/* <button> Thêm mới </button> */}
        </div>
      </div>
      <div className="admin-content-component">
      <CountTotal/>
        <canvas
          ref={canvasRef}
          id="revenueChart"
          width="1400"
          height="400"
        ></canvas>
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useRef, useEffect, useState } from "react";
import { Statistic, Row, Col, Card, Table } from "antd";
import "./Dashboard.css"; // Import file CSS tùy chỉnh

const DashBoard = () => {
  // Define the state variables
  const [data, setData] = useState({});
  const [sanPham, setSanPham] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]); // New state for low-stock products

  useEffect(() => {
    const apiUrlTotal = "https://api.sqbe.store/thongke/total";
    const apiUrlSanPham = "https://api.sqbe.store/thongke/getusers";
    const apiUrlLowStock = "https://api.sqbe.store/thongke/getusers-role"; // Endpoint for low-stock products
  
    fetch(apiUrlTotal)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
      
      });
  
    fetch(apiUrlSanPham)
      .then((response) => response.json())
      .then((data) => {
        setSanPham(data);
      })
      .catch((error) => {
       
      });
  
    // Fetch low-stock products
    fetch(apiUrlLowStock)
      .then((response) => response.json())
      .then((data) => {
        setLowStockProducts(data); // Set low-stock products data
      })
      .catch((error) => {
      
        
      });
  }, []);

  // Column definitions for the low-stock products table
  const lowStockColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "ho_ten",
      key: "ho_ten",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        // Chuyển đổi giá trị role thành tên tương ứng
        switch (role) {
          case 2:
            return "Nhân viên";  // Vai trò 2 là nhân viên
          case 3:
            return "Admin";  // Vai trò 3 là admin
          default:
            return "Khác";  // Mặc định cho các vai trò khác
        }
      },
    },

  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id_user",
      key: "id_user",
    },
    {
      title: "tên người dùng",
      dataIndex: "ho_ten",
      key: "ho_ten",
    },
    {
      title: "Đăng nhập gần đây",
      dataIndex: "login_in",
      key: "login_in",
      render: (login_in) => {
        // Sử dụng hàm formatDateTime để định dạng thời gian đăng nhập
        return formatDateTime(login_in);
      },
    },
  
  ];

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Chưa cập nhật';
    const vietnamTime = new Date(dateTimeString).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    return vietnamTime;
  };


  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> Chi Tiết thống kê người dùng </h1>
        </div>
        <div className="nav-right-admin"></div>
      </div>
      <div className="admin-content-component">
        <Row gutter={16}>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic title="Tổng người dùng" value={data.totalNguoiDung} />
            </Card>
          </Col>
        
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic title="Tổng số khách hàng" value={data.totalKhachHang} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic title="Tổng số nhân viên" value={data.totalNhanVien} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic title="Tổng số admin" value={data.totalAdmin} />
            </Card>
          </Col>
        
        </Row>
        <Row gutter={16} style={{ marginTop: "25px" }}>
          <Col span={15}>
            {/* Bảng để hiển thị danh sách sản phẩm */}
            <h3>Đăng nhập gần nhất</h3>
            <Table columns={columns} dataSource={sanPham} rowKey="id_sanpham" />
          </Col>
          <Col span={9}>
            <h3>Admin & nhân viên</h3>
            {/* Bảng để hiển thị sản phẩm sắp hết */}
            <Table columns={lowStockColumns} dataSource={lowStockProducts} rowKey="product_name" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useRef, useEffect, useState } from "react";
import { Statistic, Row, Col, Card, Table } from "antd";
import "./Dashboard.css"; // Import file CSS tùy chỉnh

const DashBoard = () => {
  // Define the state variables
  const [data, setData] = useState({});
  const [sanPham, setSanPham] = useState([]);
  

  useEffect(() => {
    const apiUrlTotal = "https://api.sqbe.store/thongke/total";
    const apiDanhMuc = "https://api.sqbe.store/thongke/getdanhmucandsum";
    
  
    fetch(apiUrlTotal)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
      
      });
  
    fetch(apiDanhMuc)
      .then((response) => response.json())
      .then((data) => {
        setSanPham(data);
      })
      .catch((error) => {
     
      });
  
   
  }, []);

  

  const columns = [
    {
      title: "ID",
      dataIndex: "id_danhmuc",
      key: "id_danhmuc",
    },
    {
      title: "Tên danh mục",
      dataIndex: "ten_danhmuc",
      key: "ten_danhmuc",
    },
    {
      title: "Tổng sản phẩm trong danh mục",
      dataIndex: "total_products",
      key: "total_products",
    
    },
  ];

  

  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> Chi Tiết Thống Kê danh mục </h1>
        </div>
        <div className="nav-right-admin"></div>
      </div>
      <div className="admin-content-component">
        <Row gutter={16}>
          <Col span={6}>
            <Card className="dashboard-card">
              <Statistic title="Tổng Số danh mục" value={data.totalDanhMuc} />
            </Card>
          </Col>
        
         
        </Row>
        <Row gutter={16} style={{ marginTop: "25px" }}>
          <Col span={15}>
            {/* Bảng để hiển thị danh sách sản phẩm */}
            <h3>Thống kê tổng số sản phẩm trong danh mục</h3>
            <Table 
  columns={columns} 
  dataSource={sanPham} 
  rowKey="id_danhmuc" // Sử dụng giá trị duy nhất cho rowKey
/>

          </Col>
          <Col span={9}>
            {/* <h3>Sản phẩm sắp hết hàng & hết hàng</h3> */}
            {/* Bảng để hiển thị sản phẩm sắp hết */}
          
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;

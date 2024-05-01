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
      const apiUrlSanPham = "https://api.sqbe.store/thongke/thongketheo-sanpham";
      const apiUrlLowStock = "https://api.sqbe.store/thongke/low-stock-products"; // Endpoint for low-stock products
    
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
        dataIndex: "product_name",
        key: "product_name",
        render: (text) => (
          <span style={{ fontSize: '0.7em' }}>
            {text}
          </span>
        ),
      },
      {
        title: "Màu",
        dataIndex: "color_name",
        key: "color_name",
      },
      {
        title: "size",
        dataIndex: "size_name",
        key: "size_name",
      },
      {
        title: "Số lượng",
        dataIndex: "stock_quantity",
        key: "stock_quantity",
        render: (stock_quantity) => {
          if (stock_quantity === 0) {
            return (
              <span style={{ color: 'red', fontWeight: 'bold', fontSize:'0.7vw' }}>
                Hết hàng
              </span>
            );
          } else if (stock_quantity <= 10) {
            return (
              <span style={{ color: 'orange', fontWeight: 'bold', fontSize:'0.7vw' }}>
              sắp hết ({stock_quantity})
              </span>
            );
          }
          // Default behavior for stock quantities above 10
          return stock_quantity;
        },
      },
    ];

    const columns = [
      {
        title: "ID",
        dataIndex: "id_sanpham",
        key: "id_sanpham",
      },
      {
        title: "Tên Sản Phẩm",
        dataIndex: "ten_sanpham",
        key: "ten_sanpham",
      },
      {
        title: "Số lượng",
        dataIndex: "tong_so_luong",
        key: "tong_so_luong",
        render: (text) => text !== null ? text : "Chưa nhập",
      },    
      {
        title: "Doanh Thu",
        dataIndex: "doanh_thu",
        key: "doanh_thu",
        render: (text, record) => formatPrice(record.doanh_thu),
      },
    ];

    const formatPrice = (price) => {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    return (
      <div id="container-main-admin">
        <div id="container-nav-admin">
          <div className="nav-left-admin">
            <h1> Chi Tiết Thống Kê Sản Phẩm </h1>
          </div>
          <div className="nav-right-admin"></div>
        </div>
        <div className="admin-content-component">
          <Row gutter={16}>
            <Col span={6}>
              <Card className="dashboard-card">
                <Statistic title="Tổng Số Sản Phẩm" value={data.totalSanPham} />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="dashboard-card">
                <Statistic
                  title="Sản Phẩm Sắp Hết"
                  value={data.lowStockProducts} // Corrected
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="dashboard-card">
                <Statistic
                  title="Số Lượng Kho"
                  value={data.totalSoLuong}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "25px" }}>
            <Col span={15}>
              {/* Bảng để hiển thị danh sách sản phẩm */}
              <h3>Thống kê doanh thu theo sản phẩm</h3>
              <Table columns={columns} dataSource={sanPham} rowKey="id_sanpham" />
            </Col>
            <Col span={9}>
              <h3>Sản phẩm sắp hết hàng & hết hàng</h3>
              {/* Bảng để hiển thị sản phẩm sắp hết */}
              <Table 
  columns={lowStockColumns} 
  dataSource={lowStockProducts} 
  rowKey={(record) => {
    const productName = record.product_name || 'unknown-product';
    const colorName = record.color_name || 'unknown-color';
    const sizeName = record.size_name || 'unknown-size'; // Sửa tên trường để đảm bảo nó tồn tại

    return `${productName}-${colorName}-${sizeName}`; // Tạo khóa duy nhất
  }}
/>

            </Col>
          </Row>
        </div>
      </div>
    );
  };

  export default DashBoard;

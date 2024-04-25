import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "../../redux/cartSlice";
import { message } from 'antd';

const ChiTietSanPham = () => {
  const { id_sanpham } = useParams();
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [productDetail, setProductDetail] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Thêm state để lưu trữ hình ảnh được chọn
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://api.sqbe.store/chitietsanpham/list/${id_sanpham}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product detail");
        }
        const data = await response.json();

        if (
          data.success &&
          data.productDetails &&
          data.productDetails.length > 0
        ) {
          setProductDetail(data.productDetails[0]);
          setProductDetails(data.productDetails);
          // Extract additional images and remove the main image
          const images = Object.values(data.productDetails[0]).filter(
            (value, index) => value && index !== 0 && index !== 1 // Assuming hinh_anh_1 and id_chitietsp are the first two properties
          );
          setAdditionalImages(images);
          setSelectedImage(data.productDetails[0].hinh_anh_1); // Set hình ảnh mặc định
        } else {
          throw new Error("No product detail found for the provided ID");
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProductDetail();
  }, [id_sanpham]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(
          `https://api.sqbe.store/sanpham/colors/${id_sanpham}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch colors");
        }
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, [id_sanpham]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        // Assuming productDetail is available here
        if (productDetail) {
          const response = await fetch(
            `https://api.sqbe.store/sanpham/sizes/${productDetail.id_chitietsp}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch sizes");
          }
          const data = await response.json();
          setSizes(data);
        }
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, [productDetail]);

  const handleImageClick = (imagePath) => {
    setProductDetail({ ...productDetail, hinh_anh_1: imagePath });
    setSelectedImage(imagePath); // Cập nhật hình ảnh được chọn
  };

  const handleColorChange = (color) => {
    const selectedProductDetail = productDetails.find(
      (detail) => detail.id_mau === color.id_mau
    );
    setProductDetail(selectedProductDetail);
    
    // Reset kích thước được chọn
    setSelectedSize(null);
    
    // Tạo một mảng chứa các hình ảnh từ hinh_anh_1 đến hinh_anh_6
    const newImages = [];
    for (let i = 1; i <= 6; i++) {
      const imageKey = `hinh_anh_${i}`;
      if (selectedProductDetail[imageKey]) {
        newImages.push(selectedProductDetail[imageKey]);
      }
    }
    setAdditionalImages(newImages);
    
    // Chọn hình ảnh đầu tiên trong mảng làm hình ảnh được chọn
    setSelectedImage(newImages[0]);
  };
  


  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSelectedSizeId(size.id_size);
  };

  const handleAddToCart = () => {
    // Kiểm tra xem có kích thước đã được chọn không
    if (!selectedSize) {
      console.error("No size selected.");
      message.warning('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng');
      return;
    }
  
    // Kiểm tra số lượng sản phẩm của kích thước đã chọn
    if (selectedSize.so_luong === 0) {
      message.warning('Sản phẩm đã hết hàng.');
      return;
    }
  
    // Truyền thông tin về số lượng mặc định là 1 của kích thước đã chọn vào thông tin sản phẩm
    const productToAdd = {
      ...productDetail,
      id_size: selectedSize.id_size,
      ten_size: selectedSize.ten_size,
      so_luong: 1 // Số lượng mặc định là 1
    };
  
    // Thêm dòng console.log để hiển thị thông tin sản phẩm khi thêm vào giỏ hàng
    console.log("Thông tin sản phẩm đã thêm vào giỏ hàng:", productToAdd);
    dispatch(themSP(productToAdd));
  
    // Hiển thị thông báo khi thêm vào giỏ hàng thành công
    message.success('Thêm sản phẩm vào giỏ hàng thành công');
  };
  
  
  const handleMuaNgay = () => {
    if (!selectedSize) {
      console.error("No size selected.");
      message.warning('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng');
      return;
    }
    // Thực hiện thêm vào giỏ hàng
    handleAddToCart();
    
    // Chuyển hướng tới trang thanh toán
    navigate("/thanhtoan");
  };

  
  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div id="container-main">
      <div className="container-detail-product">
        <div className="box">
          <div className="box-1">
            <ul>
              <li>New arrival</li>
              <li>Collab</li>
            </ul>
            <div className="img">
              <img
                src={`https://api.sqbe.store/chitietsanpham/${selectedImage}`} // Sử dụng selectedImage thay vì productDetail.hinh_anh_1
                alt=""
              />
            </div>
            <div className="container-imgct">
              {additionalImages.map((image, index) => (
                <div
                  className="box-img-phu"
                  key={index}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={`https://api.sqbe.store/chitietsanpham/${image}`}
                    alt=""
                    style={{
                      border: image === selectedImage ? "2px solid blue" : "none" // Hiển thị khung viền màu xanh cho hình ảnh được chọn
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="box-2">
            <h2 className="box-2__name">
              {productDetail.ten_sanpham} - {productDetail.ten_mau} -{" "}
              {productDetail.id_chitietsp}
            </h2>
            <p className="box-2__price">
  {productDetail.gia_khuyenmai ? (
    <>
      <span style={{ textDecoration: 'line-through' }}>
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(productDetail.gia)}
      </span>
      {' '}
      <span>
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(productDetail.gia_khuyenmai)}
      </span>
    </>
  ) : (
    <span>
      {new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(productDetail.gia)}
    </span>
  )}
</p>
            <div className="box-2__color">
              {colors.map((color) => (
                <button
                  key={color.id_mau}
                  style={{
                    border: `0.1px solid ${
                      color.id_mau === productDetail.id_mau ? "grey" : " #ccc"
                    }`,
                  }}
                  onClick={() => handleColorChange(color)}
                >
                  {color.ten_mau}
                </button>
              ))}
            </div>
            <div className="box-2__size">
  {sizes.map((size) => (
    <button
      key={size.id_size}
      onClick={() => handleSizeClick(size)}
      style={{
        border: `1px solid ${size.id_size === selectedSizeId ? "grey" : "#ccc"}`,
      }}
    >
      {size.ten_size}
    </button>
  ))}
</div>
            <div className="add" onClick={handleAddToCart}>Thêm vào giỏ</div>
            <div className="buy" onClick={handleMuaNgay}>Mua ngay</div>
            <div className="box-2__detail">
              Chi tiết sản phẩm
              <ul>
                <li>Chất liệu: {productDetail.chatlieu}</li>
                <li>Relaxed Fit</li>
                <li>
                  Hình in mặt trước và sau được áp dụng công nghệ in kéo lụa.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPham;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themSP } from "../../../redux/cartSlice";
import SanPhamTrongChiTiet from "./product";
const ChiTietSanPham = () => {
  const { url_product } = useParams();
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [productDetail, setProductDetail] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const mainImageRef = useRef(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null); 
  const user = useSelector((state) => state.auth.user);
  const [initialProductDetail, setInitialProductDetail] = useState(null);
  
  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4000/chitietsanpham/listct/${url_product}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      if (data.success && data.productDetails.length > 0) {
        setProductDetail(data.productDetails[0]);
        setProductDetails(data.productDetails);

        const images = [];
        for (let i = 1; i <= 6; i++) {
          images.push(`http://localhost:4000/chitietsanpham/${data.productDetails[0][`hinh_anh_${i}`]}`);
        }
        setImageList(images);
        // Mặc định chọn hình ảnh đầu tiên khi dữ liệu được tải thành công
        setSelectedImageIndex(0);
      } else {
        throw new Error('No product details found');
      }
    } catch (error) {
     
      message.error('Failed to fetch product details');
    }
  }, [url_product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  
  
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/sanpham/colors-ct/${url_product}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch colors");
        }
        const data = await response.json();
        setColors(data);
      
      } catch (error) {
      
      }
    };

    fetchColors();
  }, [url_product]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        if (productDetail) {
          const response = await fetch(
            `http://localhost:4000/sanpham/sizes/${productDetail.id_chitietsp}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch sizes");
          }
          const data = await response.json();
          setSizes(data);
         
        }
      } catch (error) {
      
      }
    };

    fetchSizes();
  }, [productDetail]);
  const handleColorClick = (index) => {
    setSelectedColorIndex(index);
    const selectedColor = colors[index];
    const selectedProductDetail = productDetails.find(detail => detail.id_mau === selectedColor.id_mau);
    
    // Cập nhật productDetail với thông tin của sản phẩm tương ứng với màu được chọn
    setProductDetail(selectedProductDetail);
    
    const colorImages = [];
    for (let i = 1; i <= 6; i++) {
      colorImages.push(`http://localhost:4000/chitietsanpham/${selectedColor[`hinh_anh_${i}`]}`);
    }
    setImageList(colorImages);
    setSelectedImageIndex(0); // Reset to display the first image of the newly selected color
    
    setSelectedSize(null); // Reset selected size when switching colors
};

  

  const scrollToImage = (index) => {
    setSelectedImageIndex(index); // Update state when image is selected
    if (mainImageRef.current && index >= 0 && index < imageList.length) {
      const selectedImage = mainImageRef.current.children[index];
      if (selectedImage) {
        selectedImage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      message.warning('Vui lòng chọn size sản phẩm');
      return;
    }
  
    if (selectedSize.so_luong === 0) {
      message.warning('Sản phẩm đã hết hàng');
      return;
    }
    
    const productToAdd = {
      ...productDetail,
      id_size: selectedSize.id_size,
      ten_size: selectedSize.ten_size,
      so_luong: 1 // Số lượng mặc định là 1
    };
    
    // Assuming productDetail contains the selected product
    dispatch(themSP(productToAdd));
    message.success('Thêm vào giỏ hàng thành công');
  };
  
  const handleMuaNgay = () => {
    if (!selectedSize) {
   
      message.warning('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng');
      return;
    }
    // Thực hiện thêm vào giỏ hàng
    handleAddToCart();
    
    // Chuyển hướng tới trang thanh toán
    navigate("/thanhtoan");
  };

  const handleFavoriteClick = async (productId, userId) => {
    
    try {
        if (!userId) {
      // Hiển thị cảnh báo nếu không có người dùng đăng nhập
      message.warning('Vui lòng đăng nhập tài khoản!!');
      return;
    }
      const response = await fetch(`http://localhost:4000/taikhoan/addfavorite/${productId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchProduct();
      message.success('Đã thêm vào sản phẩm yêu thích');
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
     
    }
  };
  

  const handleRemoveFavoriteClick = async (productId, userId) => {
    try {
      const response = await fetch(`http://localhost:4000/taikhoan/removefavorite/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchProduct();
      message.success('Đã xóa sản phẩm yêu thích');
      // Nếu thành công, có thể cập nhật giao diện người dùng hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
     
    }
  };
  


  // Kiểm tra nếu sản phẩm chưa được tải
  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div id="container-main">
      <div id="container-chitietv2">
        <div className="left-ctsp">
          <div className="box-left">
            {Array.from({ length: 6 }, (_, index) => (
              <div className={`box-image ${selectedImageIndex === index ? 'selected' : ''}`} key={index} onClick={() => scrollToImage(index)}>
                <img src={imageList[index]} alt="" />
              </div>
            ))}
          </div>
          <div className="box-right">
            <div className="box-image-main" ref={mainImageRef}>
              {imageList.map((imageUrl, index) => (
                <img src={imageUrl} key={index} alt="" className={selectedImageIndex === index ? 'selected' : ''} />
              ))}
            </div>
          </div>
        </div>
        <div className="right-ctsp">
          <div className="name-ctsp">{productDetail.ten_sanpham}</div>
          <div className="price-ctsp">
  <span style={{ textDecoration: productDetail.gia_khuyenmai !== 0 ? 'line-through' : 'none' }}>
    {formatPrice(productDetail.gia)}
  </span>
  {productDetail.gia_khuyenmai !== 0 && (
    <span style={{ marginLeft: '10px', color: 'red' }}>
      {formatPrice(productDetail.gia_khuyenmai)}
    </span>
  )}
</div>


          <div className="container-loai-ctsp">
           {colors.map((color, index) => (
  <div key={index} className="box-img-loai" >
    <img src={`http://localhost:4000/chitietsanpham/${color.hinh_anh_6}`} alt="" style={{ border: selectedColorIndex === index ? '2px solid rgba(128, 128, 128, 0.386)' : 'none' }} onClick={() => handleColorClick(index)}/>
  </div>
))}
          </div>
          <select id="select-size" onChange={(e) => setSelectedSize(sizes.find(size => size.id_size === parseInt(e.target.value)))}>
            <option value="">Chọn size sản phẩm</option>
            {sizes.map((size) => (
  <option key={size.id_size} value={size.id_size} style={{ color: size.so_luong === 0 ? 'tomato' : 'black' }}>
    {size.ten_size} {size.so_luong === 0 ? "- hết hàng" : ""}
  </option>
))}



          </select>
          <div className="button-favorite">
          <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            {user && user.id_user && productDetail.id_user === user.id_user ? (
 <div className="icon-container" style={{border: "1px solid pink"}} onClick={() => handleRemoveFavoriteClick(productDetail.id_sanpham, user.id_user)}> <i className="material-icons" style={{ color: ' pink' }}>favorite</i></div>     
) : (
  <div className="icon-container" onClick={() => handleFavoriteClick(productDetail.id_sanpham, user ? user.id_user : null)}> <i className="material-icons" >favorite_outline</i></div>     
)}
            
          </div>
          <button id="muangay" onClick={handleMuaNgay}>Mua Ngay</button>
          <div className="mota-sanpham">
            <h1>Thông tin sản phẩm</h1>
            <ul>
              <li> Màu: {productDetail.ten_mau}.</li>
              <li> Chất liệu: {productDetail.chatlieu}.</li>
              <li> Kiểu dáng: {productDetail.kieu_dang}.</li>
              <li> Mô tả: {productDetail.mota}.</li>
            </ul>
          </div>  
        </div>
      </div>

     
      <SanPhamTrongChiTiet/>
    </div>
  );
};

export default ChiTietSanPham;

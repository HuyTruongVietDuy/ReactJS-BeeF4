import React, { useState, useEffect } from 'react';

const SuaProduct = ({ showEditModal, closeEditModal, sanphamID, handleEditProduct }) => {
  const [ten_sanpham, setTenSanPham] = useState('');
  const [id_DanhMuc, setIdDanhMuc] = useState('');
  const [chatlieu, setChatlieu] = useState('');
  const [trang_thai, setTrangThai] = useState('');
  const [mota, setMota] = useState(''); // State for mota
  const [kieu_dang, setKieuDang] = useState(''); // State for kieu_dang
  const [url_product, setUrlProduct] = useState(''); // State for url_product
  const [danhMucList, setDanhMucList] = useState([]);

  useEffect(() => {
    if (sanphamID) {
      setTenSanPham(sanphamID.ten_sanpham || '');
      setIdDanhMuc(sanphamID.id_DanhMuc || '');
      setChatlieu(sanphamID.chatlieu || '');
      setTrangThai(sanphamID.trang_thai || '');
      setMota(sanphamID.mota || ''); // Set initial state for mota
      setKieuDang(sanphamID.kieu_dang || ''); // Set initial state for kieu_dang
      setUrlProduct(sanphamID.url_product || ''); // Set initial state for url_product
    }
  }, [sanphamID]);

  // Fetch danh sách danh mục từ máy chủ
  useEffect(() => {
    const fetchDanhMucList = async () => {
      try {
        const response = await fetch('http://localhost:4000/danhmuc/list');
        if (!response.ok) { 
          throw new Error('Failed to fetch danh mục list');
        }
        const data = await response.json();
        if (Array.isArray(data.danhMucList)) {
          setDanhMucList(data.danhMucList);
        } else {
          console.error('Dữ liệu danh mục không hợp lệ:', data);
        }
      } catch (error) {
        console.error('Error fetching danh mục list:', error);
      }
    };
  
    fetchDanhMucList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProduct(sanphamID.id_sanpham, ten_sanpham, id_DanhMuc, chatlieu, trang_thai, mota, kieu_dang, url_product); // Pass additional fields to handleEditProduct
    closeEditModal();
  };

  const statusOptions = [
    { value: '1', label: 'Ẩn' },
    { value: '2', label: 'Hiện' },
  ];

  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className='admin-edit-content'>
            <span id="close" onClick={closeEditModal}>x</span>
            <form className="form-admin-edit" onSubmit={handleSubmit}>
              <h1>Sửa Sản Phẩm: {sanphamID.id_sanpham}</h1>
              <label htmlFor="ten_sanpham">Tên sản phẩm:</label>
              <input type="text" id="ten_sanpham" name="ten_sanpham" value={ten_sanpham} onChange={(e) => setTenSanPham(e.target.value)} />
              <label htmlFor="chatlieu">Chất Liệu:</label>
              <input type="text" id="chatlieu" name="chatlieu" value={chatlieu} onChange={(e) => setChatlieu(e.target.value)} />
              <label htmlFor="id_DanhMuc">Danh mục:</label>
              <select id="id_DanhMuc" name="id_DanhMuc" value={id_DanhMuc} onChange={(e) => setIdDanhMuc(e.target.value)}>
                {danhMucList.map(danhMuc => (
                  <option key={danhMuc.id_danhmuc} value={danhMuc.id_danhmuc}>{danhMuc.ten_danhmuc}</option>
                ))}
              </select><br/>
              <label htmlFor="trang_thai">Trạng thái:</label>
              <select id="trang_thai" name="trang_thai" value={trang_thai} onChange={(e) => setTrangThai(e.target.value)}>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <label htmlFor="mota">Mô tả:</label>
              <input type="text" id="mota" name="mota" value={mota} onChange={(e) => setMota(e.target.value)} /><br/>
              <label htmlFor="kieu_dang">Kiểu dáng:</label>
              <input type="text" id="kieu_dang" name="kieu_dang" value={kieu_dang} onChange={(e) => setKieuDang(e.target.value)} />
              <label htmlFor="url_product">URL sản phẩm:</label>
              <input type="text" id="url_product" name="url_product" value={url_product} onChange={(e) => setUrlProduct(e.target.value)} /><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SuaProduct;

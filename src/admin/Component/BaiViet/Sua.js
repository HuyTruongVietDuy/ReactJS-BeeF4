import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import ReactQuill from "react-quill";

const Sua = () => {
  const { id_baiviet } = useParams(); // Lấy id_baiviet từ URL
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [urlBaiviet, setUrlBaiviet] = useState(""); // State for the URL of the article
  const [oldImage, setOldImage] = useState(""); // State để lưu đường dẫn hình ảnh cũ
  const navigate = useNavigate ();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.sqbe.store/baiviet/${id_baiviet}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setTitle(data.tieude);
        setContent(data.textare);
        setUrlBaiviet(data.url_baiviet); // Lưu URL bài viết
        setOldImage(data.hinhanh); // Lưu đường dẫn hình ảnh cũ
      } catch (error) {
        console.error('Error fetching article:', error);
        message.error('Đã xảy ra lỗi khi lấy thông tin bài viết');
      }
    };

    fetchData();
  }, [id_baiviet]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('tieude', title);
      formData.append('textare', content);
      formData.append('url_baiviet', urlBaiviet); // Append URL of the article
      if (image) {
        formData.append('hinhanh', image);
      }

      const response = await fetch(`https://api.sqbe.store/baiviet/editbaiviet/${id_baiviet}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to edit article');
      }
      navigate(`/admin/danhsachbaiviet`);
      message.success('Chỉnh sửa bài viết thành công');
    } catch (error) {
      console.error('Error editing article:', error);
      message.error('Đã xảy ra lỗi khi chỉnh sửa bài viết');
    }
  };

  return (
    <>
      <div id="container-main-admin">
        <div id="container-nav-admin">
          <div className='nav-left-admin'>
            <h1> Sửa bài viết</h1>
          </div>
          <div className='nav-right-admin'>
            <Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/danhsachbaiviet'>{'<'} quay về danh sách</Link>
          </div>
        </div>
        <div className='admin-content-component'>
          <form onSubmit={handleSubmit} className="container-add-news">
            <div>
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div><br />
            <div>
              {oldImage && (
                <div>
                  <label>Hình ảnh cũ:</label><br />
                  <img src={`https://api.sqbe.store/baiviet/uploads/${oldImage}`} alt="Hình ảnh cũ" style={{ maxWidth: "200px" }} />
                </div>
              )}
              <label>Chọn hình ảnh mới:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div><br />
            <div>
              <label>URL bài viết:</label>
              <input
                type="text"
                value={urlBaiviet}
                onChange={(e) => setUrlBaiviet(e.target.value)}
                required
              />
            </div><br />
            <div>
              <label>Nội dung:</label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                required
              />
            </div>
            <input type="submit" value='Lưu chỉnh sửa' />
          </form>
        </div>
      </div>
    </>
  );
};

export default Sua;

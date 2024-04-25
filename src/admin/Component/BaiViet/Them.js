import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from 'antd';
import ReactQuill from "react-quill";

const Them = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [urlBaiviet, setUrlBaiviet] = useState(""); // State for URL of the article
  const navigate = useNavigate();
  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tieude', title);
    formData.append('textare', content);
    formData.append('hinhanh', image);
    formData.append('url_baiviet', urlBaiviet); // Append URL of the article to the form data

    try {
      const response = await fetch('https://api.sqbe.store/baiviet/addbaiviet', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add new article');
      }

      const data = await response.json();
      console.log(data);
      navigate(`/admin/danhsachbaiviet`);
      message.success('Thêm bài viết mới thành công');
    } catch (error) {
      console.error('Error adding new article:', error);
      message.error('Đã xảy ra lỗi khi thêm bài viết mới');
    }
  };


  return (
    <>
      <div id="container-main-admin">
        <div id="container-nav-admin">
          <div className='nav-left-admin'>
            <h1> Thêm bài viết mới</h1>
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
              <label>Tệp hình ảnh:</label>
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
            <input type="submit" value='Thêm bài viết' />
          </form>
        </div>
      </div>
    </>
  );
};

export default Them;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { thoat } from "../../redux/authSlice.js";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from "react-router-dom";
const UserDetail = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use navigate to navigate programmatically
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Số lượng đơn hàng trên mỗi trang

    useEffect(() => {
        if (user) {
            // Fetch orders for the current user
            axios.get(`http://localhost:4000/donhang/listdh/${user.id_user}`)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, [user]); // Fetch orders when user changes

    const handleLogout = () => {
        dispatch(thoat());
        message.success('Đăng xuất thành công');
        navigate('/dangnhap'); // Redirect to "/dangnhap"
        window.location.reload();
        
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return "Chưa cập nhật";
        const vietnamTime = new Date(dateTimeString).toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
        });
        return vietnamTime;
      };
    
 // Xác định index bắt đầu và kết thúc của danh sách đơn hàng hiển thị trên trang hiện tại
 const indexOfLastOrder = currentPage * ordersPerPage;
 const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
 const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

 // Xử lý chuyển trang
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div id="container-main">
            <div className="container-user-detail">
                <div className="content">
                <div className="box-2-mb">
                        <h1>Tài khoản của tôi</h1>
                        <p>Tên tài khoản: <span>{user ? user.ho_ten : ''}</span></p>
                        <p>Địa chỉ: <span>{user ? user.diachi : ''}</span></p>
                        <p>Thành Phố: <span>{user ? user.tinh : ''}</span></p>
                        <p>Quốc gia: <span>Vietnam</span></p>
                        <p>Số điện thoại: <span>{user ? user.sdt : ''}</span></p>
                        <button style={{margin:"10px 0"}}>
            {user && user.id_user &&
                <Link to={`/suauser/${user.id_user}`}>Thêm/Sửa địa chỉ</Link>
            }
        </button>
        <button style={{margin:"10px 0"}}>
            {user && user.id_user &&
                <Link to={`/thaydoimatkhau`}>Thay đổi mật khẩu</Link>
            }
        </button>
                        <button onClick={handleLogout}>Thoát</button>
                    </div>
                    <div className="box-1">
                        <h1>Thông tin đơn hàng</h1>
                        <p className="xinchao">Xin chào, {user ? user.ho_ten : ''}</p>
                        <p id='dhgn'>Đơn hàng gần nhất</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Đơn hàng #</th>
                                    <th>Ngày</th>
                                    <th>Chuyển đến</th>
                                    <th>Quốc gia</th>
                                    <th>Tình trạng thanh toán</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentOrders.map(order => ( 
                                    <tr key={order.id_donhang}>
                                        <td>{order.id_donhang}</td>
                                        <td>{formatDateTime(order.ngay_dat)}</td>
                                        <td>{order.tinh}</td>
                                        <td>Việt Nam</td>
                                        <td id='ctn'>{order.stt_pay === 1 ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                        <td id='xct'><Link to={`/chitietdonhang/${order.id_donhang}`}>Xem chi tiết</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='page-phantrang'>
                         {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                         
                                <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""} id='one'>{i + 1}</button>
                            ))}
                         </div>   
                    </div>

                    <div className="box-2">
                        <p>Tài khoản của tôi</p>
                        <p>Tên tài khoản: <span>{user ? user.ho_ten : ''}</span></p>
                        <p>Địa chỉ: <span>{user ? user.diachi : ''}</span></p>
                        <p>Thành Phố: <span>{user ? user.tinh : ''}</span></p>
                        <p>Quốc gia: <span>Vietnam</span></p>
                        <p>Số điện thoại: <span>{user ? user.sdt : ''}</span></p>
                        <button style={{margin:"10px 0"}}>
            {user && user.id_user &&
                <Link to={`/suauser/${user.id_user}`}>Thêm/Sửa địa chỉ</Link>
            }
        </button>
        <button style={{margin:"10px 0"}}>
            {user && user.id_user &&
                <Link to={`/thaydoimatkhau`}>Thay đổi mật khẩu</Link>
            }
        </button>
                        <button onClick={handleLogout}>Thoát</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;

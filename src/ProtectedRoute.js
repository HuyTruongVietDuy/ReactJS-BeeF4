import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { message } from "antd";
export const ProtectedRoute = () => {
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  const user = useSelector(state => state.auth.user);


  console.log("daDangNhap=", daDangNhap);
  console.log("user=", user);

  if (!daDangNhap) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    // message.success("Login success.");
    return <Navigate to="/login-admin" />;
  } else if (!user || !user.role || (user.role !== 2 && user.role !== 3)) {
    // Nếu vai trò không phải là admin hoặc nhanvien, hiển thị alert và chuyển hướng về trang chính
    message.warning("Bạn không có quyền truy cập vào hệ thống quản trị.");
    // Chuyển hướng về trang chính
   
    
    // Trả về null để không render Outlet
    return <Navigate to="/user" />;
  }

  // Cho phép hiển thị nội dung bên trong Outlet nếu có quyền
  return <Outlet />;
};

export default ProtectedRoute;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; 
import UserIndex from './user/index';
import AdminIndex from './admin/index';
import ThanhToan from './user/Component/ThanhToan';
import LoginAdmin from './user/Component/login/login-admin';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

            <Route
         
          element={<ProtectedRoute />}
        >
          <Route path="/admin/*" element={<AdminIndex />} />
        </Route>
          <Route path="/*" element={<UserIndex />} />
          <Route path="/thanhtoan" element={<ThanhToan />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

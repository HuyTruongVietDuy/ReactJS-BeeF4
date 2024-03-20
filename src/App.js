import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserIndex from './user/index';
import AdminIndex from './admin/index';
import ThanhToan from './user/Component/ThanhToan';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/*" element={<AdminIndex />} />
          <Route path="/*" element={<UserIndex />} />
          <Route path="/thanhtoan" element={<ThanhToan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BrowseTables from './pages/BrowseTables';
import CreateReservation from './pages/CreateReservation';
import AdminTables from './pages/AdminTables';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tables" element={<BrowseTables />} />
        <Route path="/reserve" element={<CreateReservation />} />
        <Route path="/admin/tables" element={<AdminTables />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
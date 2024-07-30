import './App.css';
import Response from './component/Response';
import Calendar from './component/Calendar';
import Login from './component/Login';
import Board from './component/Board';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Navi from './component/Navi';
import { useAuth } from './context/AuthProvider';

function App() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logOut();
      navigate('/');
    }
  };

  return (
    <>
      <Navi userId={user.id} onLogout={onLogout} />
      <Routes>
        <Route path='/' element={<Response />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Main' element={<Calendar />} />
        <Route path='/Community' element={<Board />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

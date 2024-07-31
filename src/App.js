import './App.css';
import Response from './component/Response';
import Calendar from './component/Calendar';
import Login from './component/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Navi from './component/Navi';
import { useAuth } from './context/AuthProvider';
import AllPosts from './pages/AllPosts';
import MyPosts from './pages/MyPosts';

function App({ postService }) {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logOut();
      navigate('/');
    }
  };

  console.log(user);

  return (
    <>
      <Navi userId={user.id} onLogout={onLogout} />
      <Routes>
        <Route path='/' element={<Response />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Calendar />} />
        <Route exact path='/Community' element={<AllPosts postService={postService} />} />
        <Route exact path='/Community/:userId' element={<MyPosts postService={postService} />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

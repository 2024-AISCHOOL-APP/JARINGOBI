import './App.css';
import Response from './component/Response';
import Calendar from './component/Calendar';
import Login from './component/Login';
import Board from './component/Board';
import Signup from './component/Signup';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Navi from './component/Navi';

function App() {
  return (
    <div>
      <Navi></Navi>
      <>
        <Routes>
          <Route path='/' element={<Response />} />
          <Route path='/Main' element={<Calendar />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Community' element={<Board />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </>
    </div>
  );
}

export default App;

import './App.css';
import Response from './component/Response';
import Calendar from './component/Calendar';
import Login from './component/Login';
import Board from './component/Board';
import Signup from './component/Signup';
// import WritePost from './component/WritePost';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Response/>}/>
        <Route path='/Main' element={<Calendar/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Community' element={<Board/>}/>
        {/* <Route path='/WritePost' element={<WritePost/>}/> */}
        <Route path='/Signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App;

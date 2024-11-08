import { useEffect, useState } from 'react'
import './App.scss'
import './index.css';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import NavBar from './components/NavBar';

function App() {
  const [isStyle, setIsStyle] = useState(false);

  return (
    <div>
        <NavBar isStyle={isStyle} />
        <Routes>
            <Route path="/" element={<Main />} /> {/* 홈 페이지 */}
            <Route path="/details/:id" element={<MovieDetail />} /> {/* 상세 페이지 - id를 받아오기 */}
            <Route path="/signup" element={<Signup setIsStyle={setIsStyle}/>} />
            <Route path="/login" element={<Login setIsStyle={setIsStyle}/>}/>
        </Routes>
    </div>
  );
}

export default App

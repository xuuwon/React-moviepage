import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import './index.css';
import Header from './components/Header';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';

function App() {
  const [isStyle, setIsStyle] = useState(false);

  return (
    <div>
        <Header isStyle={isStyle} />
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

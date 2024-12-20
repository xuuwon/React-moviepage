import { useEffect, useState } from 'react'
import './App.scss'
import './index.css';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import NavBar from './components/NavBar';
import MyPage from './components/MyPage';
import { AuthProvider } from './AuthContext';
import AuthCallback from './AuthCallback';

function App() {
  const [isStyle, setIsStyle] = useState(false);
  const [isDark, setIsDark] = useState(false); // 다크모드 
  const [isFavorite, setIsFavorite] = useState(false); // 찜 목록

  return (
    <AuthProvider>
      <NavBar isStyle={isStyle} isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<Main isDark={isDark} />} /> {/* 홈 페이지 */}
        <Route path="/details/:id" element={<MovieDetail isFavorite={isFavorite} setIsFavorite={setIsFavorite} />} /> {/* 상세 페이지 - id를 받아오기 */}
        <Route path="/signup" element={<Signup setIsStyle={setIsStyle} isDark={isDark} />} />
        <Route path="/login" element={<Login setIsStyle={setIsStyle} isDark={isDark} />} />
        <Route path="/mypage" element={<MyPage isFavorite={isFavorite} setIsFavorite={setIsFavorite} isDark={isDark}/>} />
        <Route path='/auth/v1/callback' element={<AuthCallback />} />
      </Routes>
    </AuthProvider>
  );
}

export default App

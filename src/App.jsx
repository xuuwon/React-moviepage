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
import { handleKakaoLogout } from "./kakaoLogin";
import { signOut } from "./supabaseClient";

function App() {
  const [isStyle, setIsStyle] = useState(false);
  const [isDark, setIsDark] = useState(false); // 다크모드 
  const [isLogin, setIsLogin] = useState(false); // 로그인
  const [isFavorite, setIsFavorite] = useState(false); // 찜 목록

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("4aa7e415d522ad1e041216beb6f05a75"); // 카카오 앱 키로 SDK 초기화
    }
  }, []);

  useEffect(() => { // 새로고침 시 로그아웃
    signOut();
    handleKakaoLogout();
  }, [])

  return (
    <div>
      <NavBar isStyle={isStyle} isDark={isDark} setIsDark={setIsDark} isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Main isDark={isDark} />} /> {/* 홈 페이지 */}
        <Route path="/details/:id" element={<MovieDetail isFavorite={isFavorite} setIsFavorite={setIsFavorite} />} /> {/* 상세 페이지 - id를 받아오기 */}
        <Route path="/signup" element={<Signup setIsStyle={setIsStyle} isDark={isDark} />} />
        <Route path="/login" element={<Login setIsStyle={setIsStyle} isDark={isDark} setIsLogin={setIsLogin} />} />
        <Route path="/mypage" element={<MyPage isFavorite={isFavorite} setIsFavorite={setIsFavorite} isDark={isDark}/>} />
      </Routes>
    </div>
  );
}

export default App

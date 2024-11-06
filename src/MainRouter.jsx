// MainRouter.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';               // App은 홈 페이지로 사용
import MovieDetail from './components/MovieDetail';

function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<App />} />               {/* 홈 페이지 */}
            <Route path="/details" element={<MovieDetail />} /> {/* 상세 페이지 */}
        </Routes>
    );
}

export default MainRouter;

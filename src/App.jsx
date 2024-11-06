import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import MovieCard from './components/MovieCard';
import './index.css';
import MovieSlider from './components/MovieSlider';

function App() {
  const [movieListDatas, setMovieListDatas] = useState([]);
  const [vw, setVw] = useState(window.innerWidth / 100);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth / 100);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/results')
      .then(res => res.json())
      .then(res => setMovieListDatas(res))
  }, [])


  return (
    <div>
      {vw > 6.52 ? (
        <div>
          <MovieSlider />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-around',
            marginTop: '50px',
            marginBottom: '50px'
          }}>
            {movieListDatas.map((movieListData) => (
              <MovieCard key={movieListData.id} movieListData={movieListData} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px] justify-center items-center min-h-screen">
          {/* min-h-screen은 Tailwind CSS에서 화면의 전체 높이를 차지하도록 설정하여, 콘텐츠가 세로로도 중앙에 올 수 있도록 함 */}
          <p>화면의 크기가 너무 작습니다.</p>
          <p>화면의 크기를 키워주세요.</p>
        </div>
      )}
    </div>
  );
}

export default App

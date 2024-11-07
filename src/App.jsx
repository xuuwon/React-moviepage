import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import MovieCard from './components/MovieCard';
import './index.css';
import MovieSlider from './components/MovieSlider';
import movieListData from '../data/movieListData.json'

function App() {
  const [movieListDatas] = useState(movieListData.results);

  // useEffect(() => {
  //   fetch('http://localhost:3000/results')
  //     .then(res => res.json())
  //     .then(res => setMovieListDatas(res))
  // }, [])


  return (
    <div>
        <div className='main'>
          <MovieSlider movieListDatas={movieListDatas} />
          <div className='cards' style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-around',
            padding: '40px'
          }}>
            {movieListDatas.map((movieListData) => (
              <MovieCard key={movieListData.id} movieListData={movieListData} />
            ))}
          </div>
        </div>
    </div>
  );
}

export default App

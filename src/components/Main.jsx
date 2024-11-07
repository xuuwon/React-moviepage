import { useEffect, useState } from "react";
import MovieSlider from "./MovieSlider";
import MovieCard from "./MovieCard";
import '../App.scss';

export default function Main() {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const [movieListDatas, setMovieListDatas] = useState([]);
    const [page, setPage] = useState(1); // 페이지 수

    useEffect(() => {
        // fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        //     .then(res => res.json())
        //     .then(res => setMovieListDatas(res.results)) // results 키에 접근

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&language=ko-KR`)
                const data = await response.json()

                if (page === 1) {
                    setMovieListDatas(data.results)
                } else {
                    setMovieListDatas((prev) => [...prev, ...data.results])
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [page]) // page 수가 바뀔 때마다 데이터 더 불러오기

    return (
        <div>
            <div className='main'>
                <MovieSlider movieListDatas={movieListDatas} />
                <div className="w-[90%] mx-auto mt-10 text-[30px] popularText">인기순</div>
                <div className='cards' style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'space-around',
                    padding: '40px',
                    paddingTop: '20px'
                }}>{movieListDatas.map((movieListData) => (
                    <MovieCard key={movieListData.id} movieListData={movieListData} />
                ))}
                </div>
                <div className="flex justify-center mb-10">
                    <button 
                        onClick={() => setPage(prev => prev + 1)}
                        className="w-[80%] h-[50px] bg-[black] text-white rounded-2xl addBtn"
                    >더보기</button>
                </div>
            </div>
        </div>
    );
}
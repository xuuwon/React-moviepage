import { useEffect, useState } from "react";
import MovieSlider from "./MovieSlider";
import MovieCard from "./MovieCard";
import '../App.scss';
import { BASE_URL, API_READ_ACCESS_TOKEN } from '../../config.js'
import MovieNowPlaying from "./MovieNowPlaying.jsx";

export default function Main({ isDark }) {
    const [movieListDatas, setMovieListDatas] = useState([]);
    const [page, setPage] = useState(1); // 페이지 수

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/popular?language=ko-KR&page=${page}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
                        accept: 'application/json',
                    },
                })
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
            <div className={`main pt-[100px]
                ${isDark ? "dark" : ""}
            `}>
                <MovieNowPlaying />
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
                <div className="flex justify-center pb-10">
                    <button 
                        onClick={() => setPage(prev => prev + 1)}
                        className="w-[80%] h-[60px] bg-[#051014] text-white rounded-2xl addBtn"
                    >더보기</button>
                </div>
            </div>
        </div>
    );
}
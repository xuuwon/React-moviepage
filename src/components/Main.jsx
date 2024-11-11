import { useEffect, useState } from "react";
import MovieSlider from "./MovieSlider";
import MovieCard from "./MovieCard";
import '../App.scss';
import MovieNowPlaying from "./MovieNowPlaying.jsx";
import useFetch from "../hooks/useFetch.js";

export default function Main({ isDark }) {
    const [page, setPage] = useState(1); // 페이지 수

    const { data } = useFetch(
        `/movie/popular?language=ko-KR`, 
        page
    );

    const movieListDatas = data.results || []

    console.log(movieListDatas.filter(data => data.overview === ''))

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
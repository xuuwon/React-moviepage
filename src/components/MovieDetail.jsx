import { useEffect, useState } from 'react';
import movieDetailData from '../../data/movieDetailData.json';
import '../index.css';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
    const [movieDetailDatas, setMovieDetailDatas] = useState({});
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const { id } = useParams(); // id값에 접근

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`)
          .then(response => response.json())
          .then(data => setMovieDetailDatas(data))
    }, [id]) // id가 바뀔 때마다 새로 데이터 받아오기


    const genres = movieDetailDatas.genres ? movieDetailDatas.genres.map((genre) => {
        return genre.name
    }) : [];

    const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetailDatas.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/w500${movieDetailDatas.backdrop_path}`;

    return (
        <div className="w-[100vw] bg-[#e1e1e1] flex justify-center pb-[50px]">
            <div className="w-[85%] flex flex-col lg:flex-row items-center gap-[50px] mt-[50px]">
                <img src={posterUrl} className='w-[400px]' />
                <div className="flex flex-col gap-[50px]">
                    <div className="flex gap-[30px] items-center">
                        <p className="text-[30px] font-black">{movieDetailDatas.title}</p>
                        <p>평점: {movieDetailDatas.vote_average}</p>
                    </div>
                    <div>
                        장르:
                        {genres.map((genre, index) => {
                            return (
                                <span key={index}>
                                    {index == 0 && " "}
                                    {genre}
                                    {index < genres.length - 1 && ", "}
                                </span>
                            )
                        })}
                    </div>
                    <p className="leading-[33px]">줄거리: {movieDetailDatas.overview}</p>
                </div>
            </div>
        </div>
    )
}
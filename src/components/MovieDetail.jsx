import { useEffect, useState } from 'react';
import movieDetailData from '../../data/movieDetailData.json';
import '../index.css';

export default function MovieDetail() {
    const [movieDetailDatas] = useState(movieDetailData);
    const genres = movieDetailData.genres.map((genre) => {
        return genre.name
    })
    const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/w500${movieDetailData.backdrop_path}`;

    return (
        <div className="w-[100vw] bg-[#e1e1e1] flex justify-center pb-[50px]">
            <div className="w-[85%] flex flex-col lg:flex-row items-center gap-[50px] mt-[50px]">
                <img src={posterUrl} className='w-[400px]' />
                <div className="flex flex-col gap-[50px]">
                    <div className="flex gap-[30px] items-center">
                        <p className="text-[30px] font-black">{movieDetailData.title}</p>
                        <p>평점: {movieDetailData.vote_average}</p>
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
                    <p className="leading-[33px]">줄거리: {movieDetailData.overview}</p>
                </div>
            </div>
        </div>
    )
}
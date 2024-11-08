import { useEffect, useState } from 'react';
import '../index.css';
import '../App.scss';
import { useParams } from 'react-router-dom';
import { BASE_URL, API_READ_ACCESS_TOKEN, IMG_BASE_URL } from '../../config.js'

export default function MovieDetail() {
    const [movieDetailDatas, setMovieDetailDatas] = useState({});
    const { id } = useParams(); // id값에 접근

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
                        accept: 'application/json',
                    },
                })
                const data = await response.json()

                setMovieDetailDatas(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]) // id가 바뀔 때마다 새로 데이터 받아오기


    const genres = movieDetailDatas.genres ? movieDetailDatas.genres.map((genre) => {
        return genre.name
    }) : [];

    const posterUrl = `${IMG_BASE_URL}${movieDetailDatas.poster_path}`;
    const backdropUrl = `${IMG_BASE_URL}${movieDetailDatas.backdrop_path}`;

    return (
        <div className="w-[100vw] bg-[#e1e1e1] flex justify-center pb-[50px] pt-[200px] detailMain">
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
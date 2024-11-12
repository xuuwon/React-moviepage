import { useEffect, useState } from "react";
import { IMG_BASE_URL } from '../../config.js'
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";

export default function MovieNowPlaying () {
    const [randomMovieData, setRandomMovieData] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
        // /details 페이지로 이동
        navigate(`/details/${randomMovieData.id}`);
    };

    const {data} = useFetch(
        `/movie/now_playing?language=ko-KR`
    )

    const moviePlayingDatas = data.results || []; // 기본값 설정 -> randomData를 받아올 때 오류 발생 방지

    useEffect(() => {
        if (moviePlayingDatas.length > 0) {
            const index = Math.floor(Math.random() * moviePlayingDatas.length);
            setRandomMovieData(moviePlayingDatas[index]);
        }
    }, [moviePlayingDatas]);

    const backgroundStyle = moviePlayingDatas ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${IMG_BASE_URL}${randomMovieData.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : null;

    return (
        <div className="w-full h-[500px] xl:h-[650px] text-white flex flex-col justify-end gap-5 p-8 xs:p-10 text-[14px] xs:text-[19px]"
            style={backgroundStyle}
            onClick={handleClick}
        >
            <p className="text-[30px] xs:text-[45px] font-extrabold">{randomMovieData.title}</p>
            <p>개봉일 / {randomMovieData.release_date ? randomMovieData.release_date : '정보 없음'}</p>
            <p>{randomMovieData.overview ? randomMovieData.overview : '줄거리 정보 없음'}</p>
            <p>⭐ {randomMovieData.vote_average ? randomMovieData.vote_average.toFixed(1) : '정보 없음'}</p>
        </div>
    )
}
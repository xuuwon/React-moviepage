import { useEffect, useState } from "react";
import { BASE_URL, API_READ_ACCESS_TOKEN, IMG_BASE_URL } from '../../config.js'
import { useNavigate } from "react-router-dom";

export default function MovieNowPlaying () {
    const [moviePlayingDatas, setMoviePlayingDatas] = useState([]);
    const [randomMovieData, setRandomMovieData] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
        // /details 페이지로 이동
        navigate(`/details/${randomMovieData.id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/now_playing?language=ko-KR`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
                        accept: 'application/json',
                    },
                })
                const data = await response.json()

                setMoviePlayingDatas(data.results)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []) 


    useEffect(() => {
        if (moviePlayingDatas.length > 0) {
            const index = Math.floor(Math.random() * moviePlayingDatas.length);
            setRandomMovieData(moviePlayingDatas[index]);
        }
    }, [moviePlayingDatas]);

    console.log(randomMovieData)
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${IMG_BASE_URL}${randomMovieData.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="w-full h-[570px] text-white flex flex-col justify-end gap-5 p-10 text-[14px] xs:text-[19px]"
            style={backgroundStyle}
            onClick={handleClick}
        >
            <p className="text-[30px] xs:text-[45px] font-extrabold">{randomMovieData.title}</p>
            <p>개봉일 / {randomMovieData.release_date}</p>
            <p>{randomMovieData.overview}</p>
            <p>⭐ {randomMovieData.vote_average}</p>
        </div>
    )
}
import { useNavigate } from "react-router-dom";

export default function MovieCard ({ movieListData }) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movieListData.poster_path}`;
    const navigate = useNavigate();

    const handleClick = () => {
        // /details 페이지로 이동
        navigate('/details');
    };

    return (
        <div className="slideCard w-[200px] h-[370px] border border-[rgb(168, 168, 168)] hover:scale-105 ease-in duration-100 rounded-2xl" onClick={handleClick}>
            <img src={posterUrl} className="w-full h-[270px] rounded-t-2xl"/>
            <p className="pl-[7px] pr-[7px]">{movieListData.title}</p>
            <p className="pl-[7px]">평점: {movieListData.vote_average}</p>
        </div>
    )
}
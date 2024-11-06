import { useNavigate } from "react-router-dom";

export default function MovieCard ({ movieListData }) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movieListData.poster_path}`;
    const navigate = useNavigate();

    const handleClick = () => {
        // /details 페이지로 이동
        navigate('/details');
    };

    return (
        <div className="movieCard" onClick={handleClick}>
            <img src={posterUrl} style={{width: '100%', height: '270px'}}/>
            <p>{movieListData.title}</p>
            <p>평점: {movieListData.vote_average}</p>
        </div>
    )
}
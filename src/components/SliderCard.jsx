import { useNavigate } from "react-router-dom";
import '../App.scss'

export default function SlideCard ({movieListData, index}) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movieListData.poster_path}`;
    const navigate = useNavigate();
    const rankingArr = [];

    for (let i = 1; i <= 20; i++) {
        rankingArr.push(i)
    }
    
    const handleClick = () => {
        // /details 페이지로 이동
        navigate(`/details/${movieListData.id}`);
    };

    return (
        <div className="slideCard w-[200px] hover:scale-105 ease-in duration-100 rounded-2xl" onClick={handleClick}>
            <p className="absolute text-[40px] top-[-20px] font-black text-[#fd59b3] rank">
                {movieListData.ranking}
            </p>
            <img src={posterUrl} className="w-full h-[270px] rounded-t-2xl"/>
            <div className="flex flex-col gap-2 items-center mt-2">
                <p className="text-[19px] text-center mx-1">{movieListData.title}</p>
                <p>⭐ {movieListData.vote_average.toFixed(1)}</p>
            </div>
        </div>
    )
}
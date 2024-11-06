import { useNavigate } from "react-router-dom";
import '../App.scss'

export default function Header () {
    const navigate = useNavigate();

    const handleClick = () => {
        // /details 페이지로 이동
        navigate('/');
    };

    return (
        <div className="w-full h-[100px] border bg-black flex items-center text-white justify-between px-9">
            <p className="text-[30px] ozMovieText" onClick={handleClick}>OZ Movie</p>
            <div className="flex flex-row gap-6 headerBtns">
                <button className="bg-[purple] w-[80px] h-[35px] rounded-md">로그인</button>
                <button className="bg-[purple] w-[80px] h-[35px] rounded-md">회원가입</button>
            </div>
        </div>
    )
}
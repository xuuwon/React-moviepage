import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Menu ({ menuIsVisible, setIsLogin, setOnMenu }) {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    return (
        <div className={`w-[100px] h-[100px] absolute top-[80px] right-5 bg-[#2E2F2F] bg-opacity-90 
            flex flex-col justify-center items-center gap-4 pt-2
            ${menuIsVisible ? "open" : "close"}
        `}>
            <button
                onClick={() => {
                    navigate('/mypage')
                    setOnMenu(false);
                }}
            >마이페이지</button>
            <button
                onClick={() => {
                    setIsLogin(false);
                    setOnMenu(false);
                    logOut();
                    navigate('/')
                }}
            >로그아웃</button>
        </div>
    )
}
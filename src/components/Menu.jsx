import { useNavigate } from "react-router-dom";
import { handleKakaoLogout } from "../kakaoLogin";
import { signOut } from "../supabaseClient";

export default function Menu ({ menuIsVisible, setIsLogin, setOnMenu }) {
    const handleSignOut = async () => {
        await signOut();
    };
    const navigate = useNavigate();

    return (
        <div className={`w-[150px] h-[100px] absolute top-[80px] right-0 bg-[#2E2F2F] bg-opacity-90 
            flex flex-col gap-4 pt-2
            ${menuIsVisible ? "open" : "close"}
        `}>
            <button
                onClick={() => {
                    navigate('/mypage')
                    setOnMenu(false);
                }}
            >마이페이지</button>
            <hr/>
            <button
                onClick={() => {
                    setIsLogin(false);
                    handleSignOut();
                    handleKakaoLogout();
                    setOnMenu(false);
                    navigate('/')
                }}
            >로그아웃</button>
        </div>
    )
}
import { useEffect, useState } from "react"
import '../App.scss';
import '../index.css';
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { fetchKakaoUserInfo } from "../kakaoLogin";

export default function Login({ setIsStyle, isDark, setIsLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({ error: '' });

    const navigate = useNavigate();

    useEffect(() => {
        setIsStyle(true); // 컴포넌트가 렌더링되면 스타일 적용

        return () => setIsStyle(false); // 컴포넌트가 사라질 때 스타일 제거
    }, [setIsStyle]);

    async function signIn(email, password) { // 로그인
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError({ error: "이메일 또는 비밀번호를 잘못 입력하셨습니다." })
        } else {
            // 로그인 성공 시
            // 로그인 버튼 로그아웃으로 체인지
            // 회원가입 버튼 마이페이지로 체인지
            setIsLogin(true); // 로그인 성공
            navigate('/');
        }

        console.log(data.user.email)
    }

    const handleLogIn = async () => {
        await signIn(email, password)
    }

    function handleKakaoLogin() { // 카카오톡 로그인
        window.Kakao.Auth.login({
            success: function (authObj) {
                console.log("Kakao login successful:", authObj);
                // 로그인 성공 후 사용자 정보 요청
                fetchKakaoUserInfo();
                setIsLogin(true); // 로그인 성공
                navigate('/');
            },
            fail: function (err) {
                console.error("Kakao login failed:", err);
            },
        });
    }



    return (
        <div className={`w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-[40px] login
            ${isDark ? "dark" : ""}`
        }>
            <p className="text-[35px] loginText pb-4">Log In</p>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Password"
                />
                {error.error && <p className="text-[red] pl-2 pt-2">{error.error}</p>}
            </div>
            <div className="flex flex-col gap-3">
                <button className="w-[400px] h-[40px] text-white bg-[#2E2F2F] loginBtn"
                    onClick={handleLogIn}
                >Log In</button>
                <button className="w-[400px] h-[40px] text-[#3C1E1E] bg-[#FEE500]"
                    onClick={handleKakaoLogin}
                >카카오톡 Log In</button>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import '../App.scss';
import '../index.css';
import { useAuth } from "../AuthContext";

export default function Login({ setIsStyle, isDark }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, handleKakaoLogin, loginError, setLoginError } = useAuth(); // signUp 함수와 에러 상태 가져오기\

    useEffect(() => {
        setLoginError({ email: '', password: '', error: '' }); // 에러 초기화
    }, [])

    useEffect(() => {
        setIsStyle(true); // 컴포넌트가 렌더링되면 스타일 적용

        return () => setIsStyle(false); // 컴포넌트가 사라질 때 스타일 제거
    }, [setIsStyle]);

    const handleLogIn = async () => {
        await signIn(email, password)
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
                {loginError.email && <p className="text-[red] pl-2 pt-2">{loginError.email}</p>}
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Password"
                />
                {loginError.password && <p className="text-[red] pl-2 pt-2">{loginError.password}</p>}
                {loginError.error && <p className="text-[red] pl-2 pt-2">{loginError.error}</p>}
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
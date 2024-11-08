import { useEffect, useState } from "react"
import '../App.scss';
import '../index.css';

export default function Login({ setIsStyle, isDark }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setIsStyle(true); // 컴포넌트가 렌더링되면 스타일 적용

        return () => setIsStyle(false); // 컴포넌트가 사라질 때 스타일 제거
    }, [setIsStyle]);

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
            </div>
            <button className="w-[400px] h-[40px] text-white bg-[#2E2F2F]">Log In</button>
        </div>
    )
}
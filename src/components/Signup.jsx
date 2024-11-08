import { useEffect, useState } from "react"
import '../App.scss';
import '../index.css';

export default function Signup({ setIsStyle, isDark }) {
    useEffect(() => {
        setIsStyle(true);

        return () => setIsStyle(false);
    }, [setIsStyle]);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    return (
        <div className={`w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-[40px] signup
            ${isDark ? "dark" : ""}`
        }>
            <p className="text-[35px] loginText pb-4">Sign Up</p>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Name"
                />
            </div>
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
            <div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Confirm Password"
                />
            </div>
            <button className="w-[400px] h-[40px] text-white bg-[#2E2F2F]">Sign Up</button>
        </div>
    )
}
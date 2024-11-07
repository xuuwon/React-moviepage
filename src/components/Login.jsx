import { useEffect, useState } from "react"
import '../App.scss';
import '../index.css';

export default function Login ({ setIsStyle }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {
        setIsStyle(true); // 컴포넌트가 렌더링되면 스타일 적용
    
        return () => setIsStyle(false); // 컴포넌트가 사라질 때 스타일 제거
    }, [setIsStyle]);

    return (
        <div className="w-1000px h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-[50px] login">
            <p className="text-[35px]">Log In</p>
            <div>
                <p>Email</p>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-[400px] h-[30px] border border-black"
                />
            </div>
            <div>
                <p>Password</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-[400px] h-[30px] border border-black"
                />
            </div>
            <button className="w-[400px] h-[40px] border border-black">Log In</button>
        </div>
    )
}
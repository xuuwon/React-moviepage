import { useEffect, useState } from "react"
import '../App.scss';
import '../index.css';

export default function Signup ({ setIsStyle }) {
    useEffect(() => {
        setIsStyle(true); // ComponentA가 렌더링되면 스타일 적용
    
        return () => setIsStyle(false); // 컴포넌트가 사라질 때 스타일 제거
    }, [setIsStyle]);


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    return (
        <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-[50px] signup">
            <p className="text-[35px]">Sign Up</p>
            <div>
                <p>Name</p>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-[400px] h-[30px] border border-black"
                />
            </div>
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
            <div>
                <p>Confirm Password</p>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-[400px] h-[30px] border border-black"
                />
            </div>
            <button className="w-[400px] h-[40px] border border-black">Sign Up</button>
        </div>
    )
}
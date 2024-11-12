import { useEffect, useState } from "react";
import '../App.scss';
import '../index.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Signup({ setIsStyle, isDark }) {
    useEffect(() => {
        setIsStyle(true);
        setError({ name: '', email: '', password: '', confirmPassword: '' }); // 에러 초기화
        return () => setIsStyle(false);
    }, [setIsStyle]);

    const { signUp, error, setError, validation } = useAuth(); // signUp 함수와 에러 상태 가져오기

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [onModal, setOnModal] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        const isSuccess = await signUp(name, email, password, confirmPassword);

        if (isSuccess) {
            console.log("회원가입 성공");
            setOnModal(true)
        } else {
            console.log("회원가입 실패");
        }
    };

    return (
        <div className={`w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-[40px] signup
            ${isDark ? "dark" : ""}`
        }>  
            {onModal ? <div className="w-[300px] h-[200px] bg-white border-2 absolute">
                <p className="absolute top-2 right-4"
                    onClick={() => {
                        setOnModal(false)
                        navigate('/')
                    }}
                >X</p>
                <div className="flex flex-col h-[200px] justify-center items-center gap-9">
                    <p>회원가입이 완료되었습니다.</p>
                    <button className="bg-[#2E2F2F] text-white border-2 w-[80px] h-[40px] rounded-md"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >로그인</button>
                </div>
            </div> : null}
            <p className="text-[35px] loginText pb-4">Sign Up</p>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError((prev) => ({ ...prev, name: '' })); // 에러 초기화
                    }}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Name"
                />
                {error.name && <p className="text-[red] pl-2 pt-2">{error.name}</p>}
            </div>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError((prev) => ({ ...prev, email: '' })); // 에러 초기화
                    }}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Email"
                />
                {error.email && <p className="text-[red] pl-2 pt-2">{error.email}</p>}
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError((prev) => ({ ...prev, password: '' })); // 에러 초기화
                    }}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Password"
                />
                {error.password && <p className="text-[red] pl-2 pt-2">{error.password}</p>}
            </div>
            <div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError((prev) => ({ ...prev, confirmPassword: '' })); // 에러 초기화
                    }}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Confirm Password"
                />
                {error.confirmPassword && <p className="text-[red] pl-2 pt-2">{error.confirmPassword}</p>}
            </div>
            <button className="w-[400px] h-[40px] text-white bg-[#2E2F2F] signupBtn" onClick={() => {
                handleSignUp()
            }}>
                Sign Up
            </button>
        </div>
    );
}

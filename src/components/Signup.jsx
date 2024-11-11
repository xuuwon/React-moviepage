import { useEffect, useState } from "react";
import '../App.scss';
import '../index.css';
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup({ setIsStyle, isDark }) {
    useEffect(() => {
        setIsStyle(true);
        return () => setIsStyle(false);
    }, [setIsStyle]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [onModal, setOnModal] = useState(false);

    async function signUp(email, password, confirmPassword) {
        // 유효성 검사
        validataion(email, password, confirmPassword)

        // 회원가입 요청
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            // 에러 메시지에 따라 상태 업데이트
            if (error.message.includes("already registered")) {
                setError((prev) => ({ ...prev, email: "이미 등록된 이메일입니다." }));
            } else if (error.status === 400) {
                setError((prev) => ({ ...prev, email: "유효하지 않은 이메일입니다." }));
            }
        } else {
            setOnModal(true);
            // 초기화
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError({ name: '', email: '', password: '', confirmPassword: '' }); // 에러 초기화
        }
    }

    const handleSignUp = async () => {
        await signUp(email, password, confirmPassword);
    };

    const navigate = useNavigate();

    const validataion = (email, password, confirmPassword) => {
        // 유효성 검사
        if (name.trim() === '') {
            setError((prev) => ({ ...prev, name: "이름을 정확히 입력해 주세요." }));
            return;
        }
        if (email.trim() === '' || !email.includes('@') || !email.includes('.')) {
            setError((prev) => ({ ...prev, email: "Email을 정확히 입력해 주세요." }));
            return
        }
        if (password.length < 8) {
            setError((prev) => ({ ...prev, password: "비밀번호가 너무 짧습니다. 8자 이상으로 작성해주세요." }));
            return
        }
        if (password !== confirmPassword) {
            setError((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
            return
        }
    }

    return (
        <div className={`w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-[40px] signup
            ${isDark ? "dark" : ""}`
        }>  
            {onModal ? <div className="w-[300px] h-[200px] bg-white border-2 absolute">
                <p className="absolute top-2 right-4"
                    onClick={() => setOnModal(false)}
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
                    onBlur={() => validataion(email, password, confirmPassword)}
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
                    onBlur={() => validataion(email, password, confirmPassword)}
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
                    onBlur={() => validataion(email, password, confirmPassword)}
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
                    onBlur={() => validataion(email, password, confirmPassword)}
                    className="w-[400px] h-[40px] outline-none border border-b-[#9ca0a0] pl-5"
                    placeholder="Confirm Password"
                />
                {error.confirmPassword && <p className="text-[red] pl-2 pt-2">{error.confirmPassword}</p>}
            </div>
            <button className="w-[400px] h-[40px] text-white bg-[#2E2F2F] signupBtn" onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    );
}

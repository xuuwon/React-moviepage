import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loginType, setLoginType] = useState(null); // 로그인 유형 저장
    const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loginError, setLoginError] = useState({ email: '', password:'', error: ''});
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("4aa7e415d522ad1e041216beb6f05a75"); // 카카오 앱 키로 SDK 초기화
        }
    }, []);

    // Kakao 로그인 함수
    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: function (authObj) {
                console.log("Kakao login successful:", authObj);

                sessionStorage.setItem('kakaoAccessToken', authObj.access_token);
                fetchKakaoUserInfo();
                setIsLogin(true);
                setLoginType("kakao"); // 로그인 유형 설정
                navigate('/');
            },
            fail: function (err) {
                console.error("Kakao login failed:", err);
                setError("Kakao login failed");
            },
        });
    };

    // Kakao 사용자 정보 요청 함수
    const fetchKakaoUserInfo = () => {
        const token = sessionStorage.getItem('kakaoAccessToken');
        if (!token) return;

        window.Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
                console.log("Kakao user info:", response);
                setUser(response);
            },
            fail: function (error) {
                console.error("Failed to fetch Kakao user info:", error);
            }
        });
    };

    // Supabase 이메일 로그인 함수
    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (email.trim() === '') {
            setLoginError({ email: "이메일을 입력해주세요."});
            return;
        } else if (password.trim() === '') {
            setLoginError({ password: "비밀번호를 입력해주세요."});
            return;
        }

        if (error) {
            setLoginError({ error: "이메일 또는 비밀번호를 잘못 입력하셨습니다."});
        } else {
            setUser(data.user);
            setIsLogin(true);
            setLoginType("supabase"); // 로그인 유형 설정
            setLoginError({error: ''})
            navigate('/');
            sessionStorage.setItem('email', email);
        }
    };

    // 로그아웃 함수 (Kakao와 Supabase 모두 로그아웃 처리)
    const logOut = async () => {
        if (loginType === "kakao") {
            window.Kakao.Auth.logout(() => console.log("Kakao logged out"));
        }

        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error: ', error.message);
        } else {
            console.log('Logout successful');
            setUser(null);
            setIsLogin(false);
            setLoginError({error: ''});
            setError({ name: '', email: '', password: '', confirmPassword: '' });
            sessionStorage.removeItem('kakaoAccessToken');
            sessionStorage.removeItem('email');
            setLoginType(null);
        }
    };

    // Supabase 회원가입 함수
    const signUp = async (name, email, password, confirmPassword) => {
        // 유효성 검사
        const hasValidationError = validation(name, email, password, confirmPassword);
    
        if (hasValidationError) {
            console.log('회원가입 중단');
            return; // 유효성 검사 실패 시 중단
        }
    
        // 회원가입 요청
        const { data, error } = await supabase.auth.signUp({ email, password });
    
        if (error) {
            if (error.message.includes("already registered")) {
                setError({ email: "이미 등록된 이메일입니다." });
            } else if (error.status === 400) {
                setError({ email: "유효하지 않은 이메일입니다." });
            }
        } else {
            setUser(data.user);
            setError({ name: '', email: '', password: '', confirmPassword: '' });
            return true;
        }
    };

    // 유효성 검사 함수
    const validation = (name, email, password, confirmPassword) => {
        const errors = {};
        let hasError = false;
    
        if (name.trim() === '') {
            errors.name = "이름을 정확히 입력해 주세요.";
            hasError = true;
        }
        if (email.trim() === '' || !email.includes('@') || !email.includes('.')) {
            errors.email = "Email을 정확히 입력해 주세요.";
            hasError = true;
        }
        if (password.length < 8) {
            errors.password = "비밀번호가 너무 짧습니다. 8자 이상으로 작성해주세요.";
            hasError = true;
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
            hasError = true;
        }
    
        setError(errors); // 오류 메시지 업데이트
        setIsError(hasError); // 오류 여부 설정
    
        return hasError;
    };
    
    // 새로고침 시 세션 확인 및 사용자 정보 로드
    useEffect(() => {
        const accessToken = sessionStorage.getItem('kakaoAccessToken');
        const email = sessionStorage.getItem('email');

        if (accessToken) {
            setIsLogin(true);
            setLoginType("kakao");
            fetchKakaoUserInfo(); // Kakao 사용자 정보 요청
        } else if (email) {
            setIsLogin(true);
            setLoginType("supabase");
            getUser(); // Supabase 사용자 정보 요청
        }
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setUser(user);
    };

    return (
        <AuthContext.Provider value={{ isLogin, loginType, setIsLogin, fetchKakaoUserInfo, user, error, setError, loginError, handleKakaoLogin, signIn, logOut, getUser, signUp, validation, setLoginError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
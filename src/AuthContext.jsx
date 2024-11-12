import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loginError, setLoginError] = useState({ email: '', password: '', error: '' });
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init("4aa7e415d522ad1e041216beb6f05a75"); // 카카오 앱 키로 SDK 초기화
        }
    }, []);

    // Kakao 로그인 요청 함수
    const handleKakaoLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
        });

        if (error) {
            console.error('Kakao 로그인 오류:', error.message);
            return;
        }

        if (data?.url) {
            window.location.href = data.url; // Kakao 인증 페이지로 리디렉션
        }
    };

    // 로그인 후 콜백에서 세션 정보 설정 함수
    const handleAuthCallback = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('세션 가져오기 오류:', error.message);
            return;
        }

        if (session) {
            // 로그인 상태 업데이트
            setIsLogin(true);
            navigate('/'); // 로그인 후 메인 페이지로 이동
        }
    };

    // Supabase 이메일 로그인 함수
    const signIn = async (email, password) => {
        if (email.trim() === '') {
            setLoginError({ email: "이메일을 입력해주세요." });
            return;
        } else if (password.trim() === '') {
            setLoginError({ password: "비밀번호를 입력해주세요." });
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setLoginError({ error: "이메일 또는 비밀번호를 잘못 입력하셨습니다." });
        } else {
            setUser(data.user);
            setIsLogin(true);
            setLoginError({ error: '' })
            navigate('/');
        }
    };

    // 로그아웃 함수
    const logOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('로그아웃 오류:', error.message);
        } else {
            setIsLogin(false);
            setLoginType(null);
            navigate('/'); // 로그아웃 후 로그인 페이지로 이동
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

    // 페이지 로드 시 쿠키 기반 세션 복원
    useEffect(() => {
        const restoreSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user)
                setIsLogin(true);
                setLoginType(session.user.app_metadata.provider);
            }
        };

        restoreSession();

        // 세션 상태가 변경될 때마다 로그인 상태 업데이트
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setUser(user);
    };

    return (
        <AuthContext.Provider value={{ handleAuthCallback, isLogin, setIsLogin, user, error, setError, loginError, handleKakaoLogin, signIn, logOut, getUser, signUp, validation, setLoginError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
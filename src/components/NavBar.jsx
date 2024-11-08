import { useNavigate } from "react-router-dom";
import '../App.scss';
import { useEffect, useState } from "react";
import Search from "./Search";
import sun from '../image/sun.png'
import moon from '../image/moon.png'
import search from '../image/whiteSearch.png'

export default function NavBar ({ isStyle, isDark, setIsDark }) {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // 처음 렌더링 될 때 자꾸 햄버거 생김
    const [onSearch, setOnSearch] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // 언마운트 시 스타일 적용

    useEffect(() => { // windowWidth 업데이트
        const handleSize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleSize)

        return () => window.removeEventListener('resize', handleSize); // cleanup
    }, [windowWidth])

    return (
        <div 
            className="w-[100vw] h-[100px] border bg-[#2E2F2F]
                flex items-center text-white justify-between px-[20px] xs:px-[40px]
                fixed top-0 left-0 z-10
                border-none"
            style={isStyle ? {marginRight: '5px'} : {}}
        >
            <p className="text-[40px] ozMovieText" 
                onClick={() => {
                    navigate('/')
                    document.body.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }}
            >XU Movie</p>
            <div className="flex items-center gap-5">
                {isDark ? 
                    <img src={sun}
                        onClick={() => setIsDark(false)}
                    /> : 
                    <img src={moon} 
                        onClick={() => setIsDark(true)}
                    />}
                <img    
                    src={search}              
                    onClick={() => {
                        if (onSearch) {
                            setIsVisible(false)
                            setTimeout(() => {
                                setOnSearch(false)
                            }, 300)
                        } else {
                            setIsVisible(true)
                            setOnSearch(true)
                        }
                    }}
                />
                {onSearch ? <Search isVisible={isVisible} setIsVisible={setIsVisible} setOnSearch={setOnSearch}/> : null}
                <div className="flex flex-row gap-4 headerBtns">
                    <button className="bg-transparent border-2 w-[80px] h-[40px] rounded-md"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >로그인</button>
                    <button className="bg-transparent border-2 w-[80px] h-[40px] rounded-md"
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >회원가입</button>
                </div>
            </div>
        </div>
    )
}
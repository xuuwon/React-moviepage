import { useNavigate } from "react-router-dom";
import '../App.scss';
import { useEffect, useState } from "react";
import Search from "./Search";
import sun from '../image/sun.png'
import moon from '../image/moon.png'
import search from '../image/whiteSearch.png'
import user from '../image/user.png'
import Menu from "./Menu";

export default function NavBar ({ isStyle, isDark, setIsDark, isLogin, setIsLogin }) {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [onSearch, setOnSearch] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // 검색 언마운트 시 스타일 적용
    const [menuIsVisible, setMenuIsVisible] = useState(false); // 회원 언마운트 시 스타일 적용
    const [onMenu, setOnMenu] = useState(false);

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
                    />
                }
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
                    {isLogin ? null
                    :
                    <button className="bg-transparent border-2 w-[80px] h-[40px] rounded-md"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >로그인</button>
                    }

                    {isLogin ? 
                    <div className="w-[50px] h-[50px] flex justify-center items-center"
                        onClick={() => {
                            if (onMenu) {
                                setMenuIsVisible(false)
                                setTimeout(() => {
                                    setOnMenu(false)
                                }, 300)
                            } else {
                                setMenuIsVisible(true)
                                setOnMenu(true)
                            }
                        }}
                    >
                        <img src={user} />
                    </div>
                    :
                    <button className="bg-transparent border-2 w-[80px] h-[40px] rounded-md"
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >회원가입</button> 
                    }

                    {onMenu ? <Menu menuIsVisible={menuIsVisible} setIsLogin={setIsLogin} setOnMenu={setOnMenu}/> : null}
                </div>
            </div>
        </div>
    )
}
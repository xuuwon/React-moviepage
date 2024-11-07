import { useNavigate } from "react-router-dom";
import '../App.scss'
import Hamburger from "./Hamburger";
import { useEffect, useState } from "react";

export default function Header ({ isStyle }) {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // 처음 렌더링 될 때 자꾸 햄버거 생김

    useEffect(() => { // windowWidth 업데이트
        const handleSize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleSize)

        return () => window.removeEventListener('resize', handleSize); // cleanup
    }, [windowWidth])

    return (
        <div 
            className="w-[100vw] h-[100px] xs:h-[200px] border bg-black flex items-center text-white justify-between px-9"
            style={isStyle ? {marginRight: '5px'} : {}}
        >
            <p className="text-[35px] ozMovieText" 
                onClick={() => {
                    navigate('/')
                }}
            >XU Movie</p>
            <div className="flex items-center gap-5">
                {windowWidth < 500 ? <Hamburger /> : null}
                <div className="flex flex-row gap-4 headerBtns">
                    <button className="bg-[#ff3dff] w-[80px] h-[35px] rounded-md"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >로그인</button>
                    <button className="bg-[#ff3dff] w-[80px] h-[35px] rounded-md"
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >회원가입</button>
                </div>
            </div>
        </div>
    )
}
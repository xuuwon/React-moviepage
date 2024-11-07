import { useState } from "react"
import '../App.scss'

export default function Hamburger() {
    const [onMenu, setOnMenu] = useState(false);

    return (
        <>
            <p 
                className="text-[25px]"
                onClick={() => {
                    setOnMenu(!onMenu);
                }}
            >🍔</p>
            {onMenu ? <HamburgerMenu /> : null}
        </>
    )
}

function HamburgerMenu () {
    return (
        <div className="
            w-[200px] h-[200px] bg-[white] rounded-2xl
            absolute top-[80px] right-[100px] z-10 hamburger
            flex flex-col items-center justify-center gap-2
        ">
            <p className="text-[blue] text-[20px] font-bold">🍔 메뉴 🍔</p>
            <p className="text-black">🍖 불고기 버거 🍖</p>
            <p className="text-black">🧀 모짜렐라 인더버거 🧀</p>
            <p className="text-black">🦐 통새우 와퍼 🦐</p>
            <p className="text-black">🔥 상하이 스파이시 버거 🔥</p>
        </div>
    )
}
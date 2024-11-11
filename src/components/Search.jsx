import { useState } from "react"
import MovieCard from "./MovieCard";
import { useDebounce } from "../hooks/useDebounce.js";
import "../App.scss";
import useFetch from "../hooks/useFetch.js";


export default function Search({ isVisible, setIsVisible, setOnSearch }) {
    const [inputValue, setInputValue] = useState('')
    // const [movieSearchDatas, setMovieSearchDatas] = useState([]);
    const debounceValue = useDebounce(inputValue)
    const handler = function () {
        setIsVisible(false)
        setTimeout(() => {
            setOnSearch(false)
        }, 300)
    }
    
    const {data, loading} = useFetch(`/search/movie?language=ko-KR&query=${debounceValue}`)
    const movieSearchDatas = data.results || [] // 기본값 설정 -> length 사용 위해 

    return (
        <div className={`
            w-[100vw] h-[600px] bg-[#2E2F2F] bg-opacity-90 
            absolute top-[100px] left-0 
            search ${isVisible ? "open" : "close"}
            flex flex-col items-center
            `}
        >
            <div className="flex items-center gap-5">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-[100%] h-[50px] bg-transparent border-b-2 text-[25px] pl-5 outline-none"
                />
                <img src="src\image\whiteSearch.png" />
            </div>
            <div className="flex flex-wrap h-[90%] text-white gap-6 justify-center mt-[50px] mb-[20px] overflow-y-auto">
                {loading ? <p>Loading ...</p> :
                movieSearchDatas.length > 0 ? movieSearchDatas.map((movieSearchData) => (
                    <MovieCard key={movieSearchData.id} movieListData={movieSearchData} handler={handler}/>
                )) : null
                }
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import { BASE_URL, API_READ_ACCESS_TOKEN } from '../../config.js'
import MovieCard from "./MovieCard";
import { useDebounce } from "../hooks/useDebounce.js";
import "../App.scss";


export default function Search({ isVisible, setIsVisible, setOnSearch }) {
    const [inputValue, setInputValue] = useState('')
    const [movieSearchDatas, setMovieSearchDatas] = useState([]);
    const debounceValue = useDebounce(inputValue)
    const handler = function () {
        setIsVisible(false)
        setTimeout(() => {
            setOnSearch(false)
        }, 300)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/search/movie?language=ko-KR&query=${debounceValue}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
                        accept: 'application/json',
                    },
                })
                const data = await response.json()

                setMovieSearchDatas(data.results)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [debounceValue])

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
                {movieSearchDatas.length > 0 ? movieSearchDatas.map((movieSearchData) => (
                    <MovieCard key={movieSearchData.id} movieListData={movieSearchData} handler={handler}/>
                )) : null}
            </div>
        </div>
    )
}
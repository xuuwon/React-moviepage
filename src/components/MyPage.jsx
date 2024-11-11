import { useEffect, useState } from "react";
import { fetchBookmarks } from "../bookmark";
import supabase from "../supabaseClient";
import { BASE_URL, API_READ_ACCESS_TOKEN } from '../../config.js'
import MovieCard from "./MovieCard";
import '../App.scss';

export default function MyPage({ isDark }) {
    const [userId, setUserId] = useState('');
    const [favoriteDatas, setFavoriteDatas] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserId(user.id);
        };
        getUser();
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번 실행

    useEffect(() => {
        const getBookmark = async () => {
            const data = await fetchBookmarks(userId);
            setFavoriteDatas(data || []); // 데이터가 없으면 빈 배열로 설정
        }
        if (userId) getBookmark();
    }, [userId]);

    useEffect(() => {
        const fetchAllFavorites = async () => {
            const requests = favoriteDatas.map(favoriteData =>
                fetch(`${BASE_URL}/movie/${favoriteData.movie_id}?language=ko-KR`, {
                    headers: {
                        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
                        Accept: 'application/json',
                    },
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch movie details');
                    }
                    return response.json();
                })
            );

            const results = await Promise.all(requests);
            setMovieDetails(results);
        };

        if (favoriteDatas.length > 0) {
            fetchAllFavorites();
        }
    }, [favoriteDatas]);

    console.log(movieDetails)

    return (
        <div className={`${isDark ? "dark" : ""} myPage`}>
            <p className="pt-[160px] w-[90%] mx-auto text-[30px] popularText">북마크</p>
            <div className='cards' style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'space-around',
                padding: '40px',
                overflow: 'auto'
            }}>{movieDetails.map((movieListData) => (
                <MovieCard key={movieListData.id} movieListData={movieListData} />
            ))}
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { fetchBookmarks } from "../bookmark";
import supabase from "../supabaseClient";
import { BASE_URL, API_READ_ACCESS_TOKEN } from '../../config.js'
import MovieCard from "./MovieCard";
import '../App.scss';
import { useAuth } from "../AuthContext.jsx";

export default function MyPage({ isDark }) {
    const [userId, setUserId] = useState('');
    const [favoriteDatas, setFavoriteDatas] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const { getUser, user, loginType } = useAuth();

    useEffect(() => {
        if (!userId) {
            const getUserInfo = async () => {
                await getUser();

                if (user) {
                    setUserId(user.id);
                }
            };
            getUserInfo();
        }
    }, [userId, loginType, user]);

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

    return (
        <div className={`${isDark ? "dark" : ""} myPage w-full`}>
            <p className="mx-auto text-[30px] popularText pt-[150px] pl-[50px]">북마크</p>
            <div>
                <div className='cards' style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '40px',
                    gap: '20px',
                    overflow: 'auto'
                }}>{movieDetails.map((movieListData) => (
                    <MovieCard key={movieListData.id} movieListData={movieListData} />
                ))}
                </div>
            </div>
        </div>
    )
}
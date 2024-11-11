import { useEffect, useState } from 'react';
import '../index.css';
import '../App.scss';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL } from '../../config.js';
import useFetch from '../hooks/useFetch.js';
import supabase from '../supabaseClient.js';
import { addBookmark, deleteBookmark, fetchBookmarks } from '../bookmark.js';

export default function MovieDetail() {
    const { id } = useParams(); // id값에 접근
    const [userId, setUserId] = useState('');
    const [bookmarkDatas, setBookmarkDatas] = useState([]);

    const { data: movieDetailDatas } = useFetch(`/movie/${id}?language=ko-KR`);

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
            setBookmarkDatas(data || []); // 데이터가 없으면 빈 배열로 설정
        }
        if (userId) getBookmark();
    }, [userId]);

    const handleAddBookmark = async () => {
        if (userId) {
            await addBookmark(id, userId);
            const updatedBookmarks = await fetchBookmarks(userId);
            setBookmarkDatas(updatedBookmarks || []);
        } else {
            console.log('login plz');
        }
    };

    const handleDeleteBookmark = async () => {
        if (userId) {
            await deleteBookmark(id, userId);
            const updatedBookmarks = await fetchBookmarks(userId);
            setBookmarkDatas(updatedBookmarks || []);
        }
    };

    const genres = movieDetailDatas.genres ? movieDetailDatas.genres.map((genre) => genre.name) : [];
    const posterUrl = `${IMG_BASE_URL}${movieDetailDatas.poster_path}`;
    const backdropUrl = `${IMG_BASE_URL}${movieDetailDatas.backdrop_path}`;

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div className="w-[100vw] flex justify-center pb-[50px] pt-[100px] detailMain" style={backgroundStyle}>
            <div className="w-[85%] flex flex-col lg:flex-row items-center gap-[50px] mt-[50px] text-white">
                {movieDetailDatas.poster_path ? (
                    <img src={posterUrl} className="w-[400px]" />
                ) : (
                    <div className='w-[400px] h-[500px] border-2 border-[gray] flex justify-center items-center flex-shrink-0'>이미지 정보 없음</div>
                )}
                <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col xs:flex-row gap-[30px] items-center">
                        <p className="text-[30px] font-black">{movieDetailDatas.title}</p>
                        <p>⭐ {movieDetailDatas.vote_average ? movieDetailDatas.vote_average.toFixed(1) : '정보 없음'}</p>
                        {bookmarkDatas.some(data => data.movie_id === id) ? 
                            <p className='text-[30px]' onClick={handleDeleteBookmark}>💖</p> 
                        : 
                            <p className='text-[30px]' onClick={handleAddBookmark}>🤍</p>
                        }
                    </div>
                    <div>
                        장르: {genres.length !== 0 ? genres.join(', ') : '정보 없음'}
                    </div>
                    <p className="leading-[33px]">줄거리: {movieDetailDatas.overview ? movieDetailDatas.overview : '정보 없음'}</p>
                </div>
            </div>
        </div>
    );
}

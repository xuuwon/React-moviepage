import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Swiper 6.x에서 필요한 CSS 파일
import SwiperCore, { Navigation } from 'swiper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.scss'

// Swiper에 Navigation 모듈을 추가합니다
SwiperCore.use([Navigation]);

export default function MovieSlider() {
  const [movieListDatas, setMovieListDatas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/results')
      .then(res => res.json())
      .then(res => setMovieListDatas(res))
  }, [])

  const navigate = useNavigate();

  const handleClick = () => {
    // /details 페이지로 이동
    navigate('/details');
  };

  return (
    <div className="
      w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1100px] 2xl:w-[1500px] h-[400px] 
      mx-auto mt-[30px] pt-[10px]
      border-b border-[rgb(224, 224, 224)]"
    >
      <div>
        <Swiper
          spaceBetween={45}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            // 크기가 sm 이상일 때
            640: {
              slidesPerView: 2,
            },
            // 크기가 md 이상일 때
            768: {
              slidesPerView: 3,
            },
            // 크기가 lg 이상일 때
            1024: {
              slidesPerView: 4,
            },
            // 크기가 xl 이상일 때
            1280: {
              slidesPerView: 5,
            },
            // 크기가 2xl 이상일 때
            1536: {
              slidesPerView: 6,
            }
          }}
          navigation // 네비게이션 버튼 활성화
          className='w-full h-full'
        >
          {movieListDatas.map((data) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

            return (
              <SwiperSlide key={data.id} className='hover:drop-shadow-xl'>
                <div className="w-[200px] h-[370px] border border-[rgb(168, 168, 168)] rounded-2xl slideCard" onClick={handleClick}>
                  <img src={posterUrl} className='slideimg rounded-t-2xl' />
                  <p className='pl-[7px] pr-[7px] pt-2'>{data.title}</p>
                  <p className='pl-[7px] pt-2'>평점: {data.vote_average}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  );
}

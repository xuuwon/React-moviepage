import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Swiper 6.x에서 필요한 CSS 파일
import SwiperCore, { Navigation } from 'swiper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      w-full sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1100px] 2xl:w-[1500px] h-[400px] 
      mx-auto mt-[50px] pt-[50px] pl-[10px] border-b border-black"
    >
      <div>
        <Swiper
          spaceBetween={20}
          breakpoints={{
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
              <SwiperSlide key={data.id}>
                <div className="w-[200px] h-[300px] border border-black" onClick={handleClick}>
                  <img src={posterUrl} style={{ width: '100%', height: '270px' }} />
                  <p>{data.title}</p>
                  <p>평점: {data.vote_average}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  );
}

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Swiper 6.x에서 필요한 CSS 파일
import SwiperCore, { Navigation } from 'swiper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.scss'
import SliderCard from './SliderCard';

// Swiper에 Navigation 모듈을 추가합니다
SwiperCore.use([Navigation]);

export default function MovieSlider({ movieListDatas }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // /details 페이지로 이동
    navigate('/details');
  };

  return (
    <div className="
      w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1100px] 2xl:w-[1500px] h-[450px] 
      mx-auto mt-[30px] pt-[10px]
      border-b border-[rgb(224, 224, 224)]"
    >
      <div>
        <Swiper
          spaceBetween={10}
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
          className='w-full h-full overflow-visible'
        >
          {movieListDatas.map((movieListData) => {
            return (
              <SwiperSlide key={movieListData.id} className='hover:drop-shadow-xl xs:p-3'>
                <SliderCard movieListData={movieListData} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  );
}

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Swiper 6.x에서 필요한 CSS 파일
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { useEffect, useState } from 'react';
import '../App.scss'
import SliderCard from './SliderCard';
import useFetch from '../hooks/useFetch.js';

// Swiper에 모듈을 추가합니다
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);

export default function MovieSlider() {
  const [movieListDatas, setMovieListDatas] = useState([]);

  const { data, loading, error } = useFetch(`/movie/top_rated?language=ko-KR`)

  useEffect(() => { // useFetch로 데이터를 받아온 후 useEffect 실행
    if (data.results) {
      const rankedData = data.results.map((movie, idx) => ({
        ...movie,
        ranking: idx + 1, // 순위를 추가
      }));
      setMovieListDatas(rankedData);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="
      w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1100px] 2xl:w-[1500px] h-[550px] xs:h-[500px] 
      mx-auto mt-[30px] pt-[10px]
      border-b border-[rgb(224, 224, 224)]"
    >
      <div>
        <p className='text-[40px] mb-2 sliderText'>Top 20</p>
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
          autoplay={{
            delay: 3000, // 3초마다 슬라이드 전환
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
          }}
          loop={true}
          navigation // 네비게이션 버튼 활성화
          className='w-full h-full overflow-visible'
        >
          {movieListDatas.map((movieListData) => {
            return (
              <SwiperSlide key={movieListData.id} className='hover:drop-shadow-xl xs:p-2 mt-5'>
                <SliderCard movieListData={movieListData} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  );
}

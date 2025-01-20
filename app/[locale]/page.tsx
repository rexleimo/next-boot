import { use } from 'react';
import { Swiper, SwiperSlide } from '@/widget';

export default function Home() {
  const response = use(new Promise(resolve => setTimeout(resolve, 30000)));
  console.log(response);

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{
          delay: 4000,
        }}
      >
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={'h-40'}>GGGG{index}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

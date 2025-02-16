import { use } from 'react';

import { Swiper, SwiperSlide } from '@/widget';
import clsx from 'clsx';

export default function Home() {
  const response = use(new Promise(resolve => setTimeout(resolve, 1000)));
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

      <div
        className={clsx(
          'my-3',
          'grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6',
          'gap-3'
        )}
      >
        {Array.from({ length: 10 }).map(() => {
          return (
            <div key={''} className={'h-40 bg-amber-200'}>
              GGGG
            </div>
          );
        })}
      </div>
    </>
  );
}

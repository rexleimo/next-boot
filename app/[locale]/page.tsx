import { CustomImage } from '@/components/CustomImage';
import { use } from 'react';
import { apiClient, apiReq } from '@/packages';
import { Link } from '@/i18n/routing';
import { Swiper, SwiperSlide } from '@/widget';

export default function Home() {
  const response = use(apiClient(apiReq.store.getInventory()));
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
            <SwiperSlide>
              <div className={'h-40'}>GGGG{index}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

import { use } from 'react';
import { apiClient, apiReq } from '@/packages';
// import { Swiper, SwiperSlide } from '@/widget';
import dynamic from "next/dynamic";

const Swiper = dynamic(()=>import("@/widget/Swiper/Swiper"))
const SwiperSlide = dynamic(()=>import("@/widget/Swiper/SwiperSlide"))

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
            <SwiperSlide key={index}>
              <div className={'h-40'}>GGGG{index}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

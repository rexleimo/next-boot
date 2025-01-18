import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

function SwiperSlide(props: Props) {
  return <div className={'swiper-slide'} {...props} />;
}

export default SwiperSlide;

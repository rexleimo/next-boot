'use client';

import { SwiperNPM } from './types';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { SwiperProps as SwiperContainerProps } from 'swiper/react';

import 'swiper/css';

import { Dots } from '@/widget/Swiper/Dots';
import { AutoplayOptions } from 'swiper/types';

type SwiperProps = SwiperContainerProps;

function Swiper(props: SwiperProps) {
  const { children, ...restProps } = props;

  const swiperDivRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperNPM | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (swiperDivRef.current) {
      const swiperInstance = new SwiperNPM(swiperDivRef.current, {
        ...restProps,
        on: {
          init: function (this: SwiperNPM) {
            // 获取实际的总页数
            const totalPages = this.snapGrid.length;
            const currentPage = this.snapIndex;
            setActiveIndex(currentPage);
            setTotalSlides(totalPages);
          },
          slideChange: function (this: SwiperNPM) {
            const currentPage = this.snapIndex;
            setActiveIndex(currentPage);
          },
        },
      });
      setSwiper(swiperInstance);
      return () => {
        swiperInstance.destroy();
        setSwiper(null);
      };
    }
  }, []);

  const onDotClick = useCallback(
    (clickDotIndex: number) => {
      swiper?.slideTo(clickDotIndex);
    },
    [swiper]
  );

  return (
    <>
      <div className={'swiper'} ref={swiperDivRef}>
        <div className={'swiper-wrapper'}>{children}</div>
      </div>
      <Dots
        activeIndex={activeIndex}
        totalSlides={totalSlides}
        autoplay={restProps.autoplay as AutoplayOptions}
        onDotClick={onDotClick}
      />
    </>
  );
}

export default memo(Swiper);

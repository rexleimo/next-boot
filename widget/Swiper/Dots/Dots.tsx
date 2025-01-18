import { memo } from 'react';
import DotItem from '@/widget/Swiper/Dots/DotItem';
import { AutoplayOptions } from 'swiper/types';

type Props = {
  activeIndex: number;
  totalSlides: number;
  onDotClick?: (index: number) => void;
  autoplay?: AutoplayOptions;
};

function Dots(props: Props) {
  const { activeIndex, autoplay, totalSlides, onDotClick } = props;

  return (
    <div className={'dots relative flex justify-center items-center gap-2'}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        return (
          <DotItem
            key={index}
            active={activeIndex === index}
            delay={autoplay?.delay}
            onDotClick={() => onDotClick?.(index)}
          />
        );
      })}
    </div>
  );
}

export default memo(Dots);

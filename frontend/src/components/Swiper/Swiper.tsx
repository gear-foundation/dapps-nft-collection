import { MutableRefObject, useRef } from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import NativeSwiper from 'swiper';
import { SwiperProps } from './Swiper.interface';
import styles from './Swiper.module.scss';
import { cx } from '@/utils';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/ui';
import leftArrow from '@/assets/icons/left.svg';
import rightArrow from '@/assets/icons/right.svg';

function Swiper({ title, data, withNavigation, ...props }: SwiperProps) {
  const swiperRef: MutableRefObject<NativeSwiper | null> = useRef(null);

  const handlePrevSlide = () => {
    swiperRef.current!.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current!.slideNext();
  };

  const handleRefSwiper = (swiper: NativeSwiper) => {
    swiperRef.current = swiper;
  };

  return (
    <div className={cx(styles['swiper-wrapper'])}>
      <div className={cx(styles.header)}>
        {title && <h4 className={cx(styles.name)}>{title}</h4>}
        {withNavigation && (
          <div className={cx(styles['nav-wrapper'])}>
            <Button variant="icon" icon={leftArrow} onClick={handlePrevSlide} />
            <Button variant="icon" icon={rightArrow} onClick={handleNextSlide} />
          </div>
        )}
      </div>

      <ReactSwiper spaceBetween={16} slidesPerView={4} onSwiper={(swiper) => handleRefSwiper(swiper)} {...props}>
        {data.map((item) => (
          <SwiperSlide>{item}</SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  );
}

export { Swiper };

"use client"
import  React, {  useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

export default function ProductSlider({images}:{images:string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >

        {images.map((image , i)=> {
            return (
            <SwiperSlide key={`main-${i}`}>
          <Image loading='eager' alt={`main-img-${i}`} src={image} width={500} height={500} />
        </SwiperSlide>
            )
        } )}
        
        
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {images.map((image , i)=> {
            return (
            <SwiperSlide  key={`thumbails-${i}`}>
          <Image loading='eager' alt={`thumbnail-img-${i}`} src={image} width={500} height={500} />
        </SwiperSlide>
            )
        } )}
      </Swiper>
    </>
  );
}

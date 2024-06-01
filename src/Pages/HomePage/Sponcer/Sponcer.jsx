import { useRef, useState } from "react";
// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import img1 from "../../../assets/image/sponcer/h_1.png";
import img2 from "../../../assets/image/sponcer/h_2.png";
import img3 from "../../../assets/image/sponcer/h_3.png";
import img4 from "../../../assets/image/sponcer/h_4.png";
import img5 from "../../../assets/image/sponcer/h_5.png";
import img6 from "../../../assets/image/sponcer/h_6.png";

const Sponcer = () => {
    
  return (
    <div className="container mx-auto mt-16">
        <h1 className="text-xl text-center font-semibold ">340+ Leading Universities And Companies</h1>
         <div className=" px-10 border-2 p-8 mt-10">
      <Swiper
        spaceBetween={1}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        watchSlidesProgress={true}
        slidesPerView={5}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    </div>
   
  );
};

export default Sponcer;

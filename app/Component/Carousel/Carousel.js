"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import meetjohnny from "@/asset/materials/showcase/meetjohnny.png";
import bitanan from "@/asset/materials/showcase/bitanan.png";
import sinceresthetic from "@/asset/materials/showcase/sinceresthetic.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./carousel.css";

// import required modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";

export default function App() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      >
        <SwiperSlide>
          <Link href="https://meetjohnny.com" target="_blank">
            <Image src={meetjohnny} alt="showcase_meetjohnny" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href="https://sinceresthetic.co/" target="_blank">
            <Image src={sinceresthetic} alt="showcase_sinceresthetic" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href="https://bitanan-demo.vercel.app/" target="_blank">
            <Image src={bitanan} alt="showcase_bitanan" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

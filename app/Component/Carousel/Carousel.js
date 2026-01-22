"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import meetjohnny from "@/asset/materials/showcase/meetjohnny.png";
import ferrolink from "@/asset/materials/showcase/ferrolink.png";
import vocablake from "@/asset/materials/showcase/vocablake.png";
import cuthatcrap from "@/asset/materials/showcase/cuthatcrap.png";
import yamata from "@/asset/materials/showcase/yamata.png";
import wackywizarduni from "@/asset/materials/showcase/wackywizarduni.png";

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
          <Link href="https://www.wackywizarduni.com/" target="_blank">
            <Image src={wackywizarduni} alt="showcase_wackywizarduni" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href="https://ferrolink.io/" target="_blank">
            <Image src={ferrolink} alt="showcase_ferrolink" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href="https://www.cuthatcrap.com/" target="_blank">
            <Image src={cuthatcrap} alt="showcase_cuthatcrap" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href="https://www.vocablake.com/" target="_blank">
            <Image src={vocablake} alt="showcase_vocablake" />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href="https://www.yamata-lab.com/" target="_blank">
            <Image src={yamata} alt="showcase_yamata-lab" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

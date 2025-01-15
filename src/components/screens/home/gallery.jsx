"use client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArrowLeft, ArrowRight } from "@/components/ui/svgs";
import { EffectCoverflow, Navigation } from "swiper/modules";

import { motion } from "framer-motion";

const GallerySlider = () => {
  // Dynamic slides data
  const slides = [
    "/images/gallery/slide-service1.png",
    "/images/gallery/slide-service2.png",
    "/images/gallery/slide-service3.png",
    "/images/gallery/slide-service4.png",
    "/images/gallery/slide-service5.png",
    "/images/gallery/slide-service1.png",
    "/images/gallery/slide-service2.png",
    "/images/gallery/slide-service3.png",
    "/images/gallery/slide-service4.png",
    "/images/gallery/slide-service5.png",
  ];

  // State to track the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // State to manage arrow enable/disable
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="bg-secondary py-12 xl:py-[60px]">
      <div className="heading mx-auto max-w-[855px] space-y-4 px-4 text-center md:px-0">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-3xl font-bold text-black/75 md:text-5xl"
        >
          Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="text-base text-black/60"
        >
          Discover tailored categories designed to simplify your search, explore
          diverse options, and <br className="hidden md:block" /> find exactly
          what you need effortlessly
        </motion.p>
      </div>

      {/* Swiper Slider */}
      <div className="relative mt-10 overflow-hidden px-4 md:px-0">
        {/* custom shapes */}
        <div className="absolute -left-2 top-0 z-10 h-full w-8 bg-gradient-to-r from-white/85 via-secondary/90 to-transparent blur-md lg:w-16 2xl:w-32" />
        <div className="absolute -right-3 top-0 z-10 h-full w-8 bg-gradient-to-l from-white via-secondary/90 to-transparent blur-md lg:w-16 2xl:w-32" />
        <div>
          {/* Custom Prev Button */}
          <button
            className={`custom-prev absolute left-5 top-[50%] z-10 inline-flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full md:left-20 xl:left-40 2xl:left-80 ${
              isBeginning
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-white text-black hover:bg-gray-50"
            }`}
            disabled={isBeginning}
          >
            <ArrowLeft />
          </button>

          {/* Custom Next Button */}
          <button
            className={`custom-next absolute right-5 top-[50%] z-10 inline-flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full md:right-20 xl:right-40 2xl:right-80 ${
              isEnd
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-white text-black hover:bg-gray-50"
            }`}
            disabled={isEnd}
          >
            <ArrowRight />
          </button>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={Math.floor(slides.length / 2)}
          coverflowEffect={{
            rotate: 0,
            stretch: -29,
            depth: 90,
            modifier: 2.5,
            slideShadows: true,
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          onInit={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          modules={[EffectCoverflow, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {slides.map((slide, index) => {
            // Determine positions
            const isActive = index === activeIndex;
            const isLeftThree = index === activeIndex - 2;
            const isRightThree = index === activeIndex + 2;

            return (
              <SwiperSlide
                key={index}
                className={` ${
                  isActive
                    ? "" // Active slide
                    : isLeftThree
                      ? "left3" // Left-three position
                      : isRightThree && "right3" // Right-three position
                }`}
              >
                <div>
                  <img
                    src={slide}
                    className="h-full w-full rounded-[32px] object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default GallerySlider;

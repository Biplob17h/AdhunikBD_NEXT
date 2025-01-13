"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// Import required modules
import { feedbacks } from "@/data/feedback.data";
import { useState } from "react";
import { Autoplay } from "swiper/modules";

const ClientFeedbackSection = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="pb-16 xl:pb-32">
      <div className="container_fluid">
        <div className="heading mx-auto max-w-[855px] space-y-4 text-center">
          <h2 className="text-3xl font-bold uppercase text-black/75 md:text-5xl">
            How It Works
          </h2>
          <p className="text-base text-black/60">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have <br className="hidden md:block" /> suffered
            alteration in some.
          </p>
        </div>
      </div>
      {/* Feedback Cards slides */}
      <div className="mt-10">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          className="feedback-slide"
          initialSlide={2} // Start from the third slide
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
          }}
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={feedback.id}>
              <div
                className={`group relative mx-auto max-w-[754px] rounded-[20px] border border-[#e6f1fe] bg-white p-4 drop-shadow-sm transition-opacity lg:p-6 ${
                  index === activeIndex
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-50"
                }`}
                onMouseEnter={(e) => {
                  if (index === activeIndex) {
                    const swiper = e.target.closest(".swiper").swiper;
                    swiper.autoplay.stop();
                  }
                }}
                onMouseLeave={(e) => {
                  if (index === activeIndex) {
                    const swiper = e.target.closest(".swiper").swiper;
                    swiper.autoplay.start();
                  }
                }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                  <div className="hidden overflow-hidden rounded-full 2xl:block 2xl:min-w-[277px] 2xl:rounded-[10px]">
                    <img
                      src={feedback.image}
                      className="h-12 w-12 rounded-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 2xl:h-auto 2xl:w-full 2xl:rounded-[10px]"
                      alt={feedback.name}
                    />
                  </div>
                  <div className="flex-1 space-y-[18px]">
                    <q className="mt-0 block text-base leading-[27px] text-black/60 2xl:mt-8">
                      {feedback.feedback}
                    </q>
                    <div className="flex items-center gap-4 2xl:block">
                      <div className="2xl:hidden">
                        <img
                          src={feedback.image}
                          className="h-12 w-12 rounded-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 2xl:h-auto 2xl:w-full 2xl:rounded-[10px]"
                          alt={feedback.name}
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-inter text-base font-bold text-black">
                          {feedback.name}
                        </h4>
                        <p className="font-inter text-sm text-[#808080]">
                          {feedback.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-9 right-6 2xl:top-6">
                  <img
                    src="/quotes.svg"
                    alt="quotes"
                    className="opacity-50 2xl:opacity-100"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientFeedbackSection;

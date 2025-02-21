"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapIcon } from "@/components/ui/svgs";
import { motion } from "framer-motion";
import {
  LocateFixedIcon,
  Map,
  MapPin,
  Mic,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { categories } from "@/data/categories.data";

const HeroSection = () => {
  const [location, setLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const popularSearches = ["Shifting", "Beauty", "Home service"];

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      if (data && data.address) {
        const { town } = data.address;
        setLocation(`${town || ""}`.trim());
      } else {
        setLocation("Unable to fetch location details");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setLocation("Error fetching location details");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("Unable to retrieve location");
        },
      );
    } else {
      setLocation("Geolocation is not supported by this browser");
    }
  };

  const handlePopularSearchClick = (item) => {
    setSearchValue(item);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <hero>
      <div className="mx-auto max-w-[1250px] p-5">
        <span className="text-2xl font-semibold">Search across services</span>
        {/* search sec */}
        <search className="mt-2 flex items-center gap-3">
          <div className="relative">
            <MapPin className="absolute left-2 top-3 opacity-70" size={20} />
            <Input
              className="w-[250px] border-black py-3 pl-9 focus:border-green-500"
              placeholder="Select location"
            />
          </div>
          <div className="group relative">
            <div className="right absolute bottom-0 right-2 top-0 flex items-center gap-2">
              <Mic />
              <div className="flex size-8 items-center justify-center rounded bg-green-500">
                <Search size={18} className="text-white" />
              </div>
            </div>
            <Input
              className="w-[500px] border-black py-3 focus:border-green-500"
              placeholder="Search for services"
            />
            <div className="absolute left-0 top-14 z-[5] hidden h-[500px] w-[500px] rounded border border-green-500 bg-white px-2 group-focus-within:block">
              <span className="text-[0.6rem] font-medium uppercase text-zinc-700">
                Trending searches
              </span>
              <div>
                <div className="flex items-center gap-3 rounded px-1 py-3 transition-colors duration-300 ease-in-out hover:bg-neutral-200">
                  <div className="flex size-8 items-center justify-center rounded-md bg-gray-400">
                    <TrendingUp
                      size={16}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-none">
                      AC Searvicing
                    </span>
                    <span className="text-[0.79rem] leading-none tracking-wider text-zinc-500">
                      Category
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded px-1 py-3 transition-colors duration-300 ease-in-out hover:bg-neutral-200">
                  <div className="flex size-8 items-center justify-center rounded-md bg-gray-400">
                    <TrendingUp
                      size={16}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-none">
                      AC Searvicing
                    </span>
                    <span className="text-[0.79rem] leading-none tracking-wider text-zinc-500">
                      Category
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded px-1 py-3 transition-colors duration-300 ease-in-out hover:bg-neutral-200">
                  <div className="flex size-8 items-center justify-center rounded-md bg-gray-400">
                    <TrendingUp
                      size={16}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-none">
                      AC Searvicing
                    </span>
                    <span className="text-[0.79rem] leading-none tracking-wider text-zinc-500">
                      Category
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded px-1 py-3 transition-colors duration-300 ease-in-out hover:bg-neutral-200">
                  <div className="flex size-8 items-center justify-center rounded-md bg-gray-400">
                    <TrendingUp
                      size={16}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-none">
                      AC Searvicing
                    </span>
                    <span className="text-[0.79rem] leading-none tracking-wider text-zinc-500">
                      Category
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded px-1 py-3 transition-colors duration-300 ease-in-out hover:bg-neutral-200">
                  <div className="flex size-8 items-center justify-center rounded-md bg-gray-400">
                    <TrendingUp
                      size={16}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-none">
                      AC Searvicing
                    </span>
                    <span className="text-[0.79rem] leading-none tracking-wider text-zinc-500">
                      Category
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </search>
        {/* images slide sec */}
        <div className="mt-5 flex h-[230px] items-center gap-5">
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-full min-w-[500px] rounded"
          >
            <SwiperSlide className="relative bg-neutral-200">
              <Image src={"/images/faq.png"} objectFit="cover" layout="fill" />
            </SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 2</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 3</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 4</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 5</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 6</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 7</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 8</SwiperSlide>
            <SwiperSlide className="bg-neutral-200">Slide 9</SwiperSlide>
          </Swiper>
          {/* big images */}
          <div className="h-full w-full rounded bg-slate-200"></div>
          <div className="h-full w-full rounded bg-slate-200"></div>
          <div className="h-full w-full rounded bg-slate-200"></div>
          <div className="h-full w-full rounded bg-slate-200"></div>
        </div>
        {/* icons */}
        <div className="mt-10 grid grid-cols-8 gap-x-20 gap-y-12">
          {categories.map((category) => {
            return (
              <div className="flex flex-col gap-2">
                <div className="flex h-20 w-full cursor-pointer items-center justify-center rounded-xl border border-green-500 bg-white transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-400">
                  <Image src={category.image} alt="" width={40} height={40} />
                </div>
                <h1 className="text-center text-sm font-medium leading-none text-zinc-700">
                  {category.title}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </hero>
  );
};

export default HeroSection;

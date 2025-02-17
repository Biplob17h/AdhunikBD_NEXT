"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Link from "next/link";

const ForHomeSectionSlider = () => {
  return (
    <section className="pb-16 xl:pb-32">
      <div className="container_fluid">
        <div className="heading mx-auto max-w-[855px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            className="text-3xl font-bold text-black/75 md:text-[42px] md:leading-none"
          >
            For Your Home
          </motion.h2>
        </div>

        {/* for your home slider */}
        <div className="mt-10">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 12 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5 + index * 0.1,
                      ease: "easeInOut",
                    }}
                  >
                    <Link href="/categories" className="group relative block">
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src="/images/for-home.png"
                          className="h-full w-full rounded-xl object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                          alt="work-image"
                        />
                      </div>
                      <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2">
                        <p className="mx-auto max-w-[199.31px] rounded-xl bg-white/30 p-[7.46px] text-center font-heading text-[13.44px] font-bold text-white/75 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:bg-primary/50 group-hover:text-white">
                          Plumbing & Sanitary Services
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ForHomeSectionSlider;

"use client";
import Link from "next/link";

import { motion } from "framer-motion";

const AdsBannerSection = () => {
  const appStores = [
    { src: "/app.svg", alt: "App Store", href: "/#" },
    { src: "/google-play.svg", alt: "Google Play", href: "/#" },
  ];
  return (
    <section className="pb-16">
      <div className="container_fluid ads-banner overflow-hidden">
        <div className="items-center justify-between gap-6 pl-6 pt-12 lg:flex lg:pl-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
            className="max-w-[460px] space-y-6 xl:max-w-[666px]"
          >
            <h2 className="text-2xl font-bold text-black/75 md:text-3xl xl:text-5xl">
              Get your service from our app
            </h2>
            <p className="text-base leading-[27px] text-black/60">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some.
            </p>
            <div className="flex items-center gap-2">
              {appStores.map((store, index) => (
                <Link href={store.href} className="inline-block" key={index}>
                  <img className="w-full" src={store.src} alt={store.alt} />
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          >
            <div className="relative top-6">
              <img
                src="/phone-mockup.png"
                className="rounded-2xl"
                alt="app-mockup"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdsBannerSection;

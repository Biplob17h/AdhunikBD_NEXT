"use client";
import { motion } from "framer-motion";

const WhyShebaSection = () => {
  return (
    <section className="pb-16 pt-8 xl:pb-32 xl:pt-16">
      <div className="container_fluid">
        <div className="heading space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
            className="text-3xl font-bold text-black/75 md:text-5xl"
          >
            Why We’re Here for You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="max-w-[1154px] text-base leading-[30px] text-black/60"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
          className="mx-auto mt-10 max-h-[360px] max-w-[1136px] bg-white text-center"
        >
          <img
            src="/images/about/hero.png"
            className="h-full w-full object-cover"
            alt="hero-about"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyShebaSection;

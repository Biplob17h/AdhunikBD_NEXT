"use client";
import { motion } from "framer-motion";

const OurMissionSection = () => {
  return (
    <section className="mb-16 bg-secondary py-8 xl:py-16">
      <div className="container_fluid">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-3xl font-bold text-black/75 md:text-5xl"
          >
            Our Mission
          </motion.h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-[956px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
          >
            <img
              src="/images/about/vision.png"
              className="w-full rounded-2xl object-cover"
              alt="vision"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-20 rounded-2xl bg-white p-6"
          >
            <h6 className="inline-flex items-center gap-2 text-xl font-medium text-black">
              {" "}
              <span className="text-[10px]">⚫</span> Our Mission
            </h6>
            <p className="text-base leading-[26px] text-black/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the hjk lk ;k yyt{" "}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
          >
            <img
              src="/images/about/mission.png"
              className="w-full rounded-2xl object-cover"
              alt="vision"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
            className="space-y-20 rounded-2xl bg-white p-6"
          >
            <h6 className="inline-flex items-center gap-2 text-xl font-medium text-black">
              {" "}
              <span className="text-[10px]">⚫</span> Our Vision
            </h6>
            <p className="text-base leading-[26px] text-black/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the hjk lk ;k yyt{" "}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          >
            <img
              src="/images/about/improvement.png"
              className="w-full rounded-2xl object-cover"
              alt="vision"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
            className="space-y-20 rounded-2xl bg-white p-6"
          >
            <h6 className="inline-flex items-center gap-2 text-xl font-medium text-black">
              {" "}
              <span className="text-[10px]">⚫</span> Our Improvement
            </h6>
            <p className="text-base leading-[26px] text-black/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the hjk lk ;k yyt{" "}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;

"use client";
import { recommendedServices } from "@/data/recommended.data";
import { motion } from "framer-motion";
import Link from "next/link";

const RecommendedSection = () => {
  return (
    <section className="pb-16 xl:pb-32">
      <div className="container_fluid">
        <div className="heading mx-auto max-w-[855px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl font-bold text-black/75 md:text-[42px] md:leading-none"
          >
            Recommended
          </motion.div>
        </div>

        {/* Dynamically render services */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedServices.slice(0, 4).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + index * 0.1, ease: "easeInOut" }}
            >
              <Link
                href={`/categories/${service.id}`}
                className="group block cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={service.image}
                    className="h-full w-full rounded-xl object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                    alt={service.name}
                  />
                </div>
                <p className="text-xs font-bold text-black transition-all duration-300 ease-in-out group-hover:text-primary">
                  {service.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;

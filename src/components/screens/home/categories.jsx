"use client";
import { categories } from "@/data/categories.data";
import { motion } from "framer-motion";
import Link from "next/link";

const CategoriesSection = () => {
  return (
    <section className="py-16 xl:py-32">
      <div className="container_fluid">
        <div className="heading mx-auto max-w-[855px] space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl font-bold text-black/75 md:text-5xl"
          >
            Explore Our Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-base text-black/60"
          >
            Discover tailored categories designed to simplify your search,
            explore diverse options, and <br className="hidden md:block" /> find
            exactly what you need effortlessly
          </motion.p>
        </div>

        {/* Dynamic categories */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 xl:grid-cols-6 xl:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 + index * 0.1, ease: "easeInOut" }}
            >
              <Link
                href={`/categories/${category.id}`}
                className="bg-categories-hover group block rounded p-[1px]"
              >
                <div className="space-y-4 rounded bg-white p-4 text-center shadow-4xl">
                  <div className="mx-auto h-[67.37px] w-[67.37px]">
                    <img
                      src={category.image}
                      className="h-full w-full object-fill"
                      alt={category.title}
                    />
                  </div>
                  <h5 className="text-lg font-semibold text-black transition-all duration-300 ease-in-out group-hover:text-primary">
                    {category.title}
                  </h5>
                  <p className="text-base font-light text-[#a1a1a1]">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mt-10 text-center"
        >
          <Link
            href="/categories"
            className="rounded-lg bg-black px-8 py-3 font-inter text-lg text-white transition-all duration-300 ease-in-out hover:bg-primary"
          >
            View More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;

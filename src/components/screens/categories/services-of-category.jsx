import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ServicesOfCategorySection = ({ categories }) => {
  return (
    <section className="pb-8 xl:pb-16">
      <h2 className="text-center text-3xl font-bold text-black/75 md:text-5xl">
        Unlock the Power of All Services
      </h2>
      <div className="container_fluid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {categories.length > 0 ? (
            categories.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/categories/${service._id}`}
                  className="group inline-block cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={service.photo}
                      className="h-full w-full rounded-xl object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                      alt={service.category}
                    />
                  </div>
                  <p className="text-xs font-bold text-black transition-all duration-300 ease-in-out group-hover:text-primary">
                    {service.category}
                  </p>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-5xl font-medium text-black/60 xl:py-20">
              No services found!
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesOfCategorySection;

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ServicesOfCategorySection = ({ filteredServices }) => {
  return (
    <section className="pb-8 xl:pb-16">
      <div className="container_fluid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/categories/${service.id}`}
                  className="group inline-block cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
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

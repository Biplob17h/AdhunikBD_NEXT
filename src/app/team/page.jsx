"use client";
import { motion } from "framer-motion";
const TeamPage = () => {
  return (
    <section className="py-8 xl:py-16">
      <div className="container_fluid">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-center text-3xl font-bold text-black/75 md:text-5xl"
        >
          Our Trusted Team
        </motion.h2>

        {/* you team members */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5 + index * 0.1,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-secondary"
            >
              <img
                src="/images/team/team-member-1.png"
                alt="team-member"
                className="w-full rounded-2xl object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="bg-img absolute bottom-0 left-0 h-auto w-full rounded-br-[64px] bg-gradient-to-t from-black/85 to-transparent px-6 py-8 text-white transition-all duration-300 ease-in-out group-hover:from-primary/85">
                <div className="mt-3">
                  <h4 className="text-2xl font-bold leading-6">Tom Brown</h4>
                  <p className="text-base font-light leading-6">Ceo-Founder</p>
                </div>
              </div>
              <div className="inverted-round" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;

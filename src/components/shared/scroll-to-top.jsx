"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiArrowUpDoubleLine } from "react-icons/ri";

const ScrollToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 100); // Show button when scrolling past 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className={cn(
        `fixed bottom-5 right-5 z-50 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`,
        Math.floor(scrollProgress) >= 100 &&
          "md:bottom-8 md:left-1/2 lg:bottom-5 lg:left-auto lg:right-5",
      )}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={cn(
          "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white",
          Math.floor(scrollProgress) >= 100 && "bg-black",
        )}
        onClick={scrollToTop}
        initial={{ rotate: 0 }}
        animate={{
          rotate: scrollProgress * 3.6, // Rotate based on scroll progress
        }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          border: `4px solid rgba(255, 255, 255, 0.2)`,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `4px solid white`,
            clipPath: "circle(50%)",
          }}
          animate={{
            borderColor: scrollProgress >= 100 ? "lime" : "white",
          }}
        />
        <span className="text-xl font-bold">
          <RiArrowUpDoubleLine />
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ScrollToTop;

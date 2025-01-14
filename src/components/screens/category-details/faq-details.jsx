"use client";
import { faqServiceData } from "@/data/faqs.data";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";

const FaqDetailSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-[26px] font-semibold uppercase leading-[48px] text-black/75 underline decoration-primary decoration-wavy underline-offset-8">
        FAQ
      </h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {faqServiceData.map((faq, index) => (
          <div key={index}>
            <div
              className={`rounded-lg p-4 shadow-4xl transition-all ${
                activeIndex === index ? "" : "bg-white"
              }`}
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleAccordion(index)}
              >
                <h4
                  className={`text-lg font-medium transition-all ${
                    activeIndex === index ? "text-primary" : "text-black/75"
                  }`}
                >
                  {faq.title}
                </h4>
                <span>
                  {activeIndex === index ? (
                    <HiMinusSmall className="text-primary" />
                  ) : (
                    <GoPlus className="text-[#303A42]" />
                  )}
                </span>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  activeIndex === index
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-2 text-sm text-black/60 xl:leading-[28px]">
                  {faq.description}
                </p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqDetailSection;

"use client";
import { privacyData } from "@/data/privacy.data";
import { useEffect, useState } from "react";

const PrivacySection = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleScroll = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = document.querySelectorAll("section");
      let currentSectionId = activeSection;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSectionId = section.id;
        }
      });

      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId);
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [activeSection]);

  return (
    <section className="py-8 xl:py-16">
      <div className="container_fluid relative grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto lg:block">
          <ul className="space-y-2">
            {privacyData.map((section) => (
              <li key={section.id}>
                <button
                  className={`w-full border-b border-transparent p-2 text-left font-heading text-xl ${
                    activeSection === section.id
                      ? "border-black/10 font-medium text-black"
                      : "text-black/60"
                  }`}
                  onClick={() => handleScroll(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="space-y-12 lg:col-span-2">
          {privacyData.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-20">
              <h2 className="mb-4 text-[26px] font-bold leading-none">
                {section.title}
              </h2>
              <div className="space-y-1 text-base leading-[30px] text-black/60">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;

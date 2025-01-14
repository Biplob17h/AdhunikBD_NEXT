"use client";
import CategoryFilter from "@/components/screens/categories/category-filter";
import { recommendedServices } from "@/data/recommended.data";
import { useState } from "react";

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
   const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = recommendedServices.filter((service) => {
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;
    const matchesSearchTerm = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div>
      <CategoryFilter setActiveCategory={setActiveCategory} activeCategory={activeCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Services Section */}
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;

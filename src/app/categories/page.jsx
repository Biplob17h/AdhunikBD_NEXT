"use client";
import CategoryFilter from "@/components/screens/categories/category-filter";
import ServicesOfCategorySection from "@/components/screens/categories/services-of-category";
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
      <CategoryFilter
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ServicesOfCategorySection filteredServices={filteredServices} />
    </div>
  );
};

export default CategoriesPage;

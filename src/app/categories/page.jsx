"use client";

import CategoryFilter from "@/components/screens/categories/category-filter";
import ServicesOfCategorySection from "@/components/screens/categories/services-of-category";
import Navbar from "@/components/shared/navbar";
import useCategories from "@/hooks/CategoriesHook";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component

const CategoriesPage = () => {
  const { categories, categoriesLoading } = useCategories();

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {categoriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        ) : categories?.length > 0 ? (
          <ServicesOfCategorySection categories={categories} />
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No categories available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

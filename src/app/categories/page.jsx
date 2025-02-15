"use client";

import { createRef, useEffect, useRef, useState } from "react";
import useCategories from "@/hooks/CategoriesHook";
import useAllSubCategories from "@/hooks/getAllSubCategoryHook";
import Navbar from "@/components/shared/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

const CategoriesPage = () => {
  const { categories, categoriesLoading } = useCategories();
  const { subCategories, subCategoriesLoading } = useAllSubCategories();
  const [activeCategory, setActiveCategory] = useState(null);

  // Initialize refs at the top level
  const categoryRefs = useRef({});

  useEffect(() => {
    if (categories?.length) {
      categories.forEach((cat) => {
        if (!categoryRefs.current[cat._id]) {
          categoryRefs.current[cat._id] = createRef();
        }
      });
    }
  }, [categories]);

  // Scroll event to update active category
  useEffect(() => {
    const handleScroll = () => {
      let currentCategory = null;

      categories?.forEach((category) => {
        const section = categoryRefs.current[category._id]?.current;
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= 150) {
            currentCategory = category;
          }
        }
      });

      if (currentCategory) setActiveCategory(currentCategory);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // Scroll to category section when clicked
  const handleCategoryClick = (categoryId) => {
    const section = categoryRefs.current[categoryId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container relative mx-auto flex px-4 py-6">
      {/* Sidebar */}
      <aside className="sticky top-20 h-screen w-1/4 overflow-y-auto border-r pr-6">
        {categoriesLoading ? (
          <Skeleton className="mb-4 h-10 w-full" />
        ) : (
          <ul>
            {categories?.map((category) => (
              <li
                key={category._id}
                className={clsx(
                  "cursor-pointer border-l-4 p-3 transition",
                  activeCategory?._id === category._id
                    ? "border-blue-500 font-bold text-blue-500"
                    : "border-transparent hover:border-gray-300",
                )}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.category}
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-3/4 pl-6">
        {subCategoriesLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          categories?.map((category) => {
            const filteredSubCategories = subCategories?.filter(
              (sub) => sub.categoryId === category._id,
            );

            return (
              <section
                key={category._id}
                ref={categoryRefs.current[category._id]}
                className="mb-10"
              >
                <h2 className="mb-4 text-2xl font-bold">{category.category}</h2>
                {filteredSubCategories.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {filteredSubCategories.map((sub) => (
                      <div key={sub._id} className="rounded-lg bg-gray-100 p-4">
                        <img
                          src={sub.photo}
                          alt={sub.subCategory}
                          className="mb-2 h-24 w-full rounded-md object-cover"
                        />
                        <p className="text-center font-semibold">
                          {sub.subCategory}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No services available.</p>
                )}
              </section>
            );
          })
        )}
      </main>
    </div>
    </div>
  );
};

export default CategoriesPage;

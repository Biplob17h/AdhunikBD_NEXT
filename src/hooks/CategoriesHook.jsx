"use client";

import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesRef, setCategoriesRef] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true); // Start loading
        const response = await fetch("/api/category/all");
        const data = await response.json();

        if (data.status === "success") {
          setCategories(data?.data);
        } else {
          console.error("Error fetching categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoriesLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, [categoriesRef]); // Dependency array ensures ref triggers re-fetch

  return { categories, categoriesLoading, categoriesRef, setCategoriesRef };
};

export default useCategories;

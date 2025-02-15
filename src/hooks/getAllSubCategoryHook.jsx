"use client";
import { useEffect, useState } from "react";
const useAllSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesRef, setSubCategoriesRef] = useState(1);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);

  useEffect(() => {
    setSubCategoriesLoading(true);
    fetch("/api/subcategory/all")
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data?.data);
        setSubCategoriesLoading(false);
      });
  }, [subCategoriesRef]);

  return { subCategoriesLoading, subCategories, setSubCategoriesRef };
};

export default useAllSubCategories;

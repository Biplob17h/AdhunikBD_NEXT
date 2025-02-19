import { useEffect, useState } from "react";

const useCategorySubcategories = ({ categoryId }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [subcategoryLoading, setSubcategoryLoading] = useState(false);
  const [subcategoryRef, setSubcategoryRef] = useState(1);

  useEffect(() => {
    if (!categoryId) return; // Prevent API call if categoryId is missing

    setSubcategoryLoading(true);
    fetch(`/api/category/subcategory?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(data?.data || []);
      })
      .finally(() => setSubcategoryLoading(false));
  }, [categoryId, subcategoryRef]);

  return { subCategories, subcategoryLoading, setSubcategoryRef };
};

export default useCategorySubcategories;

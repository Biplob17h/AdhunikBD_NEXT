import { useState } from "react";

const useShowCategories = () => {
  const [showCategory, setShowCategory] = useState();
  const [showSubCategory, setShowSubCategory] = useState("");
  const [showService, setShowService] = useState("");

  return {
    showCategory,
    setShowCategory,
    showSubCategory,
    setShowSubCategory,
    showService,
    setShowService,
  };
};

export default useShowCategories

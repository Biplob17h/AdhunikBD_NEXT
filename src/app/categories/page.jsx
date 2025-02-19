"use client";
import CartPage from "@/components/categories/Cart/CartPage";
import ServicePage from "@/components/categories/Services/ServicePage";
import SubcategoryPage from "@/components/categories/Subcategories/SubcategoryPage";
import Navbar from "@/components/shared/navbar";
import useCategories from "@/hooks/CategoriesHook";
import useCategorySubcategories from "@/hooks/getCategorySubcategories";
import useSubCategoryServices from "@/hooks/getSubcategoryServices";
import useShowCategories from "@/hooks/showCategoryHook";
import React, { useState } from "react";

const CategoryPage = () => {
  const { categories, categoriesLoading } = useCategories();
  const { showCategory, setShowCategory, showSubCategory, setShowSubCategory } =
    useShowCategories();
  const { subCategories, subcategoryLoading } = useCategorySubcategories({
    categoryId: showCategory,
  });

  const { services, servicesLoading, setServices } = useSubCategoryServices(showSubCategory);


  const [show, setShow] = useState("subcategory");
  const [localRef, setLocalRef] = useState(1)

  return (
    <div>
      <Navbar />
      {/* Main Parent div */}
      <div className="mx-[3%] flex min-h-screen">
        {/* Category div */}
        <div className="min-h-screen w-2/12 border">
          <h1 className="mt-3 text-center text-2xl font-bold">
            All Categories
          </h1>
          <div className="pt-5">
            {categoriesLoading ? (
              <p>Loading...</p>
            ) : (
              categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => {
                    setShowCategory(category._id), setShow("subcategory");
                  }}
                  className={`mt-3 flex h-16 cursor-pointer items-center justify-center bg-slate-200 text-[18px] hover:bg-slate-400 ${
                    showCategory === category._id ? "bg-slate-400" : ""
                  }`}
                >
                  <h2>{category.category}</h2>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Show Div */}
        <div className="min-h-screen w-7/12 border">
          <SubcategoryPage
            showCategory={showCategory}
            subcategoryLoading={subcategoryLoading}
            subCategories={subCategories}
            setShowSubCategory={setShowSubCategory}
            setShow={setShow}
            show={show}
          />
          <ServicePage
            showCategory={showCategory}
            subCategories={subCategories}
            services={services}
            servicesLoading={servicesLoading}
            show={show}
            setShow={setShow}
            setServices={setServices}
            localRef={localRef}
            setLocalRef={setLocalRef}
          />
        </div>

        {/* Cart Div */}
        <div className="min-h-screen w-3/12 border">
          <CartPage localRef={localRef} setLocalRef={setLocalRef}/>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

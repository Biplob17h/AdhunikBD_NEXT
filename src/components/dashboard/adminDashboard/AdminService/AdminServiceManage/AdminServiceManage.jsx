import useCategories from "@/hooks/CategoriesHook";
import { useRouter } from "next/navigation";
import React from "react";

const AdminServiceManage = () => {
  const { categories, categoriesLoading } = useCategories();
  const router = useRouter();

  if (categoriesLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-semibold">Manage Service Categories</h1>
      {/* Grid for cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              onClick={() =>
                router.push(`/dashboard/admin/service/category/${category._id}`)
              }
              className="transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                src={category.photo}
                alt={category.categoryName}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {category.category}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default AdminServiceManage;

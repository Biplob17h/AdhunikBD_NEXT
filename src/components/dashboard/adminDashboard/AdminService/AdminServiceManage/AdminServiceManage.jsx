import useCategories from "@/hooks/CategoriesHook";
import React from "react";

const AdminServiceManage = () => {
  const { categories, categoriesLoading } = useCategories();

  if (categoriesLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-semibold">Manage Service Categories</h1>
      {/* Grid for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={category.photo}
                alt={category.categoryName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{category.category}</h3>
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

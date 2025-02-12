"use client";
import React, { useEffect, useState } from "react";

const AllSubcategories = ({ id, categoryRef }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryLoading, setSubcategoryLoading] = useState(false);

  useEffect(() => {
    setSubcategoryLoading(true);
    fetch(`/api/category/subcategory?categoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data?.data);
      })
      .finally(() => setSubcategoryLoading(false));
  }, [id, categoryRef]);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Subcategories</h1>

      {subcategoryLoading ? (
        <p>Loading subcategories...</p>
      ) : subcategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory._id}
              className="rounded-lg bg-white p-6 shadow-md transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={subcategory.photo}
                alt={subcategory.subCategory}
                className="mb-4 h-56 w-full rounded-md object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{subcategory.subCategory}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No subcategories available</p>
      )}
    </div>
  );
};

export default AllSubcategories;

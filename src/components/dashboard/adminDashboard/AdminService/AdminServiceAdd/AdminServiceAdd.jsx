import useCategories from "@/hooks/CategoriesHook";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import React from "react";
import toast from "react-hot-toast";

const AdminServiceAdd = ({ serviceShow, setServiceShow }) => {
  const { categoriesRef, setCategoriesRef } = useCategories();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryName = e.target.category.value;
    const photo = e.target.photo.files[0];

    if (!photo || !categoryName) {
      return toast.error("category name and photo are required");
    }

    const photoUrl = await hostPhoto(photo);

    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName, photoUrl }),
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Category added successfully");
      setServiceShow("manage");
      setCategoriesRef(categoriesRef + 1);
    } else {
      toast.error("Failed to add category");
      console.log(data);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold">Add Service Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-base font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
          />
        </div>

        {/* Category Name Input */}
        <div>
          <label className="block text-base font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="category"
            placeholder="Enter category name"
            className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 text-white text-lg font-semibold hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AdminServiceAdd;

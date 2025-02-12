"use client";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import React from "react";
import toast from "react-hot-toast";

const AddASubcategory = ({ id, setCategoryRef, setCategoryShow }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];

    if (!photo || !name) {
      return toast.error("Subcategory name and photo are required");
    }

    const photoUrl = await hostPhoto(photo);

    const res = await fetch("/api/subcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, photoUrl, categoryId: id }),
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Subcategory added successfully");
      setCategoryRef((pre) => pre + 1);
      setCategoryShow("subcategory");
      e.target.reset();
    } else {
      toast.error("Failed to add category");
      console.log(data);
    }
  };
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold">Add Sub Category</h2>
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

        {/* Sub Category Name Input */}
        <div>
          <label className="block text-base font-medium text-gray-700">
            Sub Category Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter sub category name"
            className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Add Sub Category
        </button>
      </form>
    </div>
  );
};

export default AddASubcategory;

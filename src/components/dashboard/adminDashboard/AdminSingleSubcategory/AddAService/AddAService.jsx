"use client";
import React from "react";
import toast from "react-hot-toast";

const AddAService = ({
  subCategory,
  category,
  setSubCategoryRef,
  setSubCategoryShow,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;

    const res = await fetch("/api/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        categoryId: category?._id,
        subCategoryId: subCategory?._id,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Service added successfully");
      setSubCategoryRef((pre) => pre + 1);
      setSubCategoryShow("subcategory");
      e.target.reset();
    } else {
      toast.error("Failed to add category");
      console.log(data);
    }
  };
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold">Add Service</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Name Input */}
        <div>
          <label className="block text-base font-medium text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter service name"
            className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
            required
          />
        </div>
        {/* Service Price Input */}
        <div>
          <label className="block text-base font-medium text-gray-700">
            Service Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter service Price"
            className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddAService;

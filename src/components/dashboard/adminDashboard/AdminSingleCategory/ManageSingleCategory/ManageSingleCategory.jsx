"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/CategoriesHook";

const ManageSingleCategory = ({
  id,
  category,
  categoryRef,
  setCategoryRef,
}) => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter()
  const {categoriesRef, setCategoriesRef} = useCategories()

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const name = e.target.categoryName.value;
    const photo = e.target.photo.files[0];

    let photoUrl = category.photo; // Default to existing photo

    if (photo) {
      photoUrl = await hostPhoto(photo); // Only update if a new photo is uploaded
    }

    try {
      setLoading(true);
      const res = await fetch("/api/category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: id,
          name,
          photo: photoUrl,
        }),
      });

      const data = await res.json();

      if (data?.status === "success") {
        toast.success("Category updated successfully!");
        setCategoryRef((prev) => prev + 1);
      } else {
        toast.error("Failed to update category. Please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleting(true);
      const res = await fetch(`/api/category?categoryId=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data?.status === "success") {
        toast.success("Category deleted successfully!");
        setCategoriesRef(categoriesRef + 1)
        router.push("/dashboard/admin/service")
      } else {
        toast.error("Failed to delete category. Please try again!");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        Manage Category
      </h1>

      {category ? (
        <form onSubmit={handleUpdateCategory} className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={category.photo}
              alt={category.category}
              className="mb-6 h-48 w-48 rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-medium text-gray-600">
              Category Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-2 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-600">
              Category Name
            </label>
            <Input
              type="text"
              name="categoryName"
              defaultValue={category.category}
              className="mt-2 h-12 text-lg"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 h-12 w-full text-lg"
          >
            {loading ? "Updating..." : "Update Category"}
          </Button>

          {/* Delete Button */}
          <Button
            type="button"
            onClick={handleDeleteCategory}
            disabled={deleting}
            className="mt-20 h-12 w-full bg-red-600 text-lg text-white hover:bg-red-700"
          >
            {deleting ? "Deleting..." : "Delete Category"}
          </Button>
        </form>
      ) : (
        <p className="text-center text-lg text-gray-500">No category found</p>
      )}
    </div>
  );
};

export default ManageSingleCategory;

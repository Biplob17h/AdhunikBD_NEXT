"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/CategoriesHook";

const ManageSingleSubcategory = ({
  subCategory,
  category,
  setSubCategoryRef,
  setSubCategoryShow,
  services,
}) => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingService, setDeletingService] = useState(null);
  const [updatingService, setUpdatingService] = useState(null); // Track which service is updating
  const [discountType, setDiscountType] = useState("flat");
  const [discountValue, setDiscountValue] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [editingDiscount, setEditingDiscount] = useState(null);

  const router = useRouter();
  const { categoriesRef, setCategoriesRef } = useCategories();

  const handleUpdateSubCategory = async (e) => {
    e.preventDefault();

    const name = e.target.subcategoryName.value;
    const photo = e.target.photo.files[0];

    let photoUrl = category.photo; // Default to existing photo

    if (photo) {
      photoUrl = await hostPhoto(photo); // Upload new photo if selected
    }

    try {
      setLoading(true);
      const res = await fetch("/api/subcategory", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subCategoryId: subCategory?._id,
          name,
          photo: photoUrl,
        }),
      });

      const data = await res.json();

      if (data?.status === "success") {
        toast.success("Subcategory updated successfully!");
        setSubCategoryRef((prev) => prev + 1);
        setSubCategoryShow("subcategory");
      } else {
        toast.error("Failed to update subcategory. Please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubCategory = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this subcategory? This action cannot be undone.",
      )
    ) {
      return;
    }
    try {
      setDeleting(true);
      const res = await fetch(
        `/api/subcategory?subCategoryId=${subCategory._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data?.status === "success") {
        toast.success("Subcategory deleted successfully!");
        setCategoriesRef(categoriesRef + 1);
        router.push(`/dashboard/admin/service/category/${category?._id}`);
      } else {
        toast.error("Failed to delete subcategory. Please try again!");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      setDeletingService(serviceId);
      const res = await fetch(`/api/service?serviceId=${serviceId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data?.status === "success") {
        toast.success("Service deleted successfully!");
        setSubCategoryRef((prev) => prev + 1); // Refresh subcategory data
      } else {
        toast.error("Failed to delete service. Please try again!");
      }
    } finally {
      setDeletingService(null);
    }
  };

  const handleUpdateService = async (e, serviceId) => {
    e.preventDefault();

    const name = e.target.serviceName.value;
    const price = e.target.servicePrice.value;

    try {
      setUpdatingService(serviceId);
      const res = await fetch("/api/service", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          name,
          price,
        }),
      });

      const data = await res.json();

      if (data?.status === "success") {
        toast.success("Service updated successfully!");
        setSubCategoryRef((prev) => prev + 1); // Refresh services
      } else {
        toast.error("Failed to update service. Please try again!");
      }
    } finally {
      setUpdatingService(null);
    }
  };

  const handleAddDiscount = () => {
    if (!discountValue) return toast.error("Enter a discount value");
    setDiscounts([
      ...discounts,
      { id: Date.now(), type: discountType, value: discountValue },
    ]);
    setDiscountValue("");
  };

  const handleDeleteDiscount = (id) => {
    setDiscounts(discounts.filter((discount) => discount.id !== id));
    toast.success("Discount removed");
  };

  return (
    <div className="mx-auto rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        Manage Subcategory
      </h1>

      {subCategory ? (
        <div>
          <form
            onSubmit={handleUpdateSubCategory}
            className="mx-auto max-w-2xl space-y-6"
          >
            <div className="flex flex-col items-center">
              <img
                src={subCategory.photo}
                alt={subCategory.subCategory}
                className="mb-6 h-48 w-48 rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-lg font-medium text-gray-600">
                Subcategory Photo
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
                Subcategory Name
              </label>
              <Input
                type="text"
                name="subcategoryName"
                defaultValue={subCategory.subCategory}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 h-12 w-full text-lg"
            >
              {loading ? "Updating..." : "Update Subcategory"}
            </Button>
          </form>

          {/* Display Services */}
          {services?.length > 0 ? (
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">Services</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <form
                    key={service._id}
                    onSubmit={(e) => handleUpdateService(e, service._id)}
                    className="space-y-3 rounded-lg border bg-white p-4 shadow-md"
                  >
                    <Input
                      type="text"
                      name="serviceName"
                      defaultValue={service.name}
                      className="h-10 text-lg"
                    />
                    <Input
                      type="number"
                      name="servicePrice"
                      defaultValue={service.price}
                      className="h-10 text-lg"
                    />

                    <div className="flex items-center justify-between">
                      <Button
                        type="submit"
                        disabled={updatingService === service._id}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        {updatingService === service._id
                          ? "Updating..."
                          : "Update"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleDeleteService(service._id)}
                        disabled={deletingService === service._id}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        {deletingService === service._id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </div>
                  </form>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center text-lg text-gray-500">
              No services found for this subcategory.
            </p>
          )}

          {/* Discount Management */}
          <div className="mx-auto mt-10 max-w-2xl">
            <h2 className="mb-4 text-xl font-semibold">Discount Management</h2>

            <form className="flex flex-wrap items-center gap-4">
              <select className="h-10 w-[150px] rounded-lg border px-4">
                <option value="flat">Flat Discount</option>
                <option value="percent">Percent Discount</option>
              </select>
              <input
                type="number"
                placeholder="Enter value"
                className="h-10 w-[150px] rounded-lg border px-4"
              />
              <button className="h-10 rounded-lg bg-green-500 px-4 text-white hover:bg-green-600">
                Add
              </button>
            </form>

            <div className="mt-6 space-y-4">
              {/* Discounts List */}
              <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                <p className="text-lg">100 Tk</p>
                <button className="h-10 rounded-lg bg-red-500 px-4 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                <p className="text-lg">15%</p>
                <button className="h-10 rounded-lg bg-red-500 px-4 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Delete Subcategory */}
          <div className="mt-20 flex w-full justify-center">
            <Button
              type="button"
              onClick={handleDeleteSubCategory}
              disabled={deleting}
              className="h-12 w-[500px] bg-red-500 text-lg text-white hover:bg-red-600"
            >
              {deleting ? "Deleting..." : "Delete Subcategory"}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No subcategory found
        </p>
      )}
    </div>
  );
};

export default ManageSingleSubcategory;

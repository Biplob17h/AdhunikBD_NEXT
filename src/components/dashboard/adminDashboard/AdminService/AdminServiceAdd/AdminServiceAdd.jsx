import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCategories from "@/hooks/CategoriesHook";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import { Loader, Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AdminServiceAdd = () => {
  const { categoriesRef, setCategoriesRef } = useCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryName = e.target.category.value;
    const photo = e.target.photo.files[0];

    if (!photo || !categoryName) {
      return toast.error("category name and photo are required");
    }
    setIsAdding(true);
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
      setIsAdding(false);
      setIsDialogOpen(false);
      setCategoriesRef((pre) => pre + 1);
    } else {
      toast.error("Failed to add category");
      setIsAdding(false);
    }
  };
  // State for dialog (modal) open/close

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="category"
                placeholder="Enter category name"
              />
            </div>
            {/* Image */}
            <div className="space-y-2">
              <Label htmlFor="photo">Service Image</Label>
              <Input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                placeholder="Enter image"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isAdding} className="w-full">
              {isAdding ? (
                <div className="flex items-center justify-center">
                  <Loader className="mr-2 h-5 w-5 animate-spin" /> Adding...
                </div>
              ) : (
                "Add Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    // <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
    //   <h2 className="mb-6 text-2xl font-semibold">Add Service Category</h2>
    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     {/* File Upload */}
    //     <div>
    //       <label className="block text-base font-medium text-gray-700">
    //         Upload Image
    //       </label>
    //       <input
    //         type="file"
    //         name="photo"
    //         accept="image/*"
    //         className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
    //       />
    //     </div>

    //     {/* Category Name Input */}
    //     <div>
    //       <label className="block text-base font-medium text-gray-700">
    //         Category Name
    //       </label>
    //       <input
    //         type="text"
    //         name="category"
    //         placeholder="Enter category name"
    //         className="mt-2 block w-full rounded-md border-2 border-gray-300 p-3 text-sm"
    //         required
    //       />
    //     </div>

    //     {/* Submit Button */}
    //     <button
    //       type="submit"
    //       className="w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
    //     >
    //       Add Category
    //     </button>
    //   </form>
    // </div>
  );
};

export default AdminServiceAdd;

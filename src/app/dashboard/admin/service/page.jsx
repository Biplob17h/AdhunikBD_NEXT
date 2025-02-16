"use client";
import AdminServiceAdd from "@/components/dashboard/adminDashboard/AdminService/AdminServiceAdd/AdminServiceAdd";
import AdminServiceManage from "@/components/dashboard/adminDashboard/AdminService/AdminServiceManage/AdminServiceManage";
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
import { Plus } from "lucide-react";
import React, { useState } from "react";

const AdminService = () => {
  // State for adding/editing location
  const [newCategory, setNewCategory] = useState({
    image: "",
    name: "",
  });

  // State for dialog (modal) open/close
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className={`space-y-6 p-6`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Service Management</h1>
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
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newCategory.name}
                  placeholder="Enter name"
                />
              </div>
              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image">Service Image</Label>
                <Input
                  id="image"
                  name="image"
                  value={newCategory.image}
                  placeholder="Enter image"
                />
              </div>

              {/* Submit Button */}
              <Button className="w-full">Add Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <AdminServiceManage />
    </div>
  );
};

export default AdminService;

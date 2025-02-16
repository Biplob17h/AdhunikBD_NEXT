"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import useUser from "@/hooks/UserHook";
import ChangePassword from "@/components/shared/ChangePassword/ChangePassword";

const AdminDashboardProfile = () => {
  const { user, loading, setUserRef } = useUser();
  const [userInfo, setUserInfo] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state

  useEffect(() => {
    if (!loading) {
      setUserInfo(user);
    }
  }, [user, loading]);

  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();

    if (!selectedPhoto) {
      toast.error("Please select a photo!");
      return;
    }

    setIsUploading(true);

    try {
      const photoUrl = await hostPhoto(selectedPhoto);

      const res = await fetch("/api/user/update/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo: photoUrl, phone: user?.phone }),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Profile photo updated successfully!");
        setUserRef((pre) => pre + 1);
        setIsDialogOpen(false); // Close the dialog after success
      } else {
        toast.error("Failed to update profile photo.");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the photo.");
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  const handleInfoChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address } = userInfo;

    try {
      const res = await fetch("/api/user/update/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, address }),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Profile Information
      </h1>
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
        <div className="relative">
          {user?.photo ? (
            <img
              src={user?.photo}
              alt="User Avatar"
              className="h-32 w-32 rounded-full border-4 border-gray-300 object-cover shadow-sm md:h-40 md:w-40"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 shadow-sm md:h-40 md:w-40">
              <span className="text-xl text-gray-500">No Image</span>
            </div>
          )}
          <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
                onClick={() => setIsDialogOpen(true)} // Open the dialog
              >
                <span className="text-sm font-medium text-blue-500">Edit</span>
              </button>
            </DialogTrigger>

            <DialogContent className="w-96 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">
                Update Profile Photo
              </h2>
              <form onSubmit={handleUploadPhoto}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <div className="mt-4 flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profile Info Form */}
        <div className="mt-6 w-full space-y-3 text-center md:mt-0 md:text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={userInfo?.name || ""}
                onChange={handleInfoChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                value={userInfo?.email || ""}
                onChange={handleInfoChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={userInfo?.phone || ""}
                onChange={handleInfoChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <Input
                id="address"
                name="address"
                value={userInfo?.address || ""}
                onChange={handleInfoChange}
                className="w-full"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>

          <ChangePassword/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProfile;

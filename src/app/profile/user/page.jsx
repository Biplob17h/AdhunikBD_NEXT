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
import useUser from "@/hooks/UserHook";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";

const ClientDashboardProfile = () => {
  const { user, refresh, loading, setUserRef, userRef } = useUser();
  const [userInfo, setUserInfo] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state

  useEffect(() => {
    if (!loading) {
      setUserInfo(user);
    }
  }, [user, refresh, loading]);

  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();

    if (!selectedPhoto) {
      toast.error("Please select a photo!");
      return;
    }

    setIsUploading(true); // Start loading

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

  return (
    <div
      className={`mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md `}
    >
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
              <h2 className="mb-4 text-xl font-semibold">Update Profile Photo</h2>
              <form onSubmit={handleUploadPhoto}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <div className="mt-4 flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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

        <div className="mt-6 space-y-3 text-center md:mt-0 md:text-left">
          <h2 className="text-xl font-semibold text-gray-900">
            {userInfo?.name || "N/A"}
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{" "}
            {userInfo?.email || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span>{" "}
            {userInfo?.phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Date of Birth:</span>{" "}
            {userInfo?.dateOfBirth || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Gender:</span>{" "}
            {userInfo?.gender || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">NID:</span> {userInfo?.nid || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span>{" "}
            {userInfo?.address || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardProfile;

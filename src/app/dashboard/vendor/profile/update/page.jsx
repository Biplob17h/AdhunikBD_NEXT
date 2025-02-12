"use client";

import useUser from "@/hooks/UserHook";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import React, { useState } from "react";

const VendorUpdateProfile = () => {
  const { user } = useUser();

  // function to update vendor profile photo
  const handleUpdateVendorPhoto = async (e) => {
    e.preventDefault();

    const photo = e.target.photo.files[0];

    if (!photo) {
      alert("No photo selected");
      return;
    }
    const photoUrl = await hostPhoto(photo);
    const phone = user?.phone;

    const res = await fetch(`/api/vendor/profile/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoUrl, phone }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert("Vendor photo updated successfully");
      setVendorShow("home");
    }
  };

  // function to add vendor shop photo
  const handleAddVendorShopPhoto = async (e) => {
    e.preventDefault();
    const photo = e.target.photo.files[0];
    if (!photo) {
      alert("No photo selected");
      return;
    }

    const photoUrl = await hostPhoto(photo);
    const phone = user?.phone;

    const res = await fetch(`/api/vendor/profile/shopPhoto/add`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoUrl, phone }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert("Vendor shop photo updated successfully");
      setVendorShow("home");
    }
  };

  // function to update vendor info 
  const handleUpdateVendorInfo = async (e) => {
    e.preventDefault();

    const form = e.target;
    const vendorName = form.vendorName.value;
    const shopName = form.shopName.value;
    const email = form.email.value;
    const newPhone = form.phone.value;
    const nid = form.nid.value;
    const phone = user?.phone;

    const res = await fetch(`/api/vendor/profile/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendorName,
        shopName,
        email,
        phone,
        nid,
        newPhone,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert("Vendor profile updated successfully");
      setVendorShow("home");
    }
  };

  // function to delete vendor shop photo
  const vendorRemoveShopPhoto = async (photoId) => {
    const phone = user?.phone
    const res = await fetch(`/api/vendor/profile/shopPhoto/remove`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone,photoId }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert("Vendor shop photo removed successfully");
      setVendorShow("home");
    }
  };

  return (
    <div className={` p-6`}>
      <h1 className="mb-6 text-2xl font-bold">Update Profile</h1>

      {/* Update Vendor Photo */}
      <form
        onSubmit={handleUpdateVendorPhoto}
        className="mb-6 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-lg font-semibold">Update Vendor Photo</h2>
        <input type="file" className="mb-2" name="photo" />

        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Upload Vendor Photo
        </button>
      </form>

      {/* Add Shop Photo */}
      <form
        onSubmit={handleAddVendorShopPhoto}
        className="rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-lg font-semibold">Update Shop Photo</h2>
        <input type="file" className="mb-2" name="photo" />
        <button className="mt-3 w-full rounded-md bg-yellow-600 py-2 text-white hover:bg-yellow-700">
          Upload Shop Photo
        </button>
      </form>

      {/* Update Basic Info */}
      <form
        onSubmit={handleUpdateVendorInfo}
        className="mb-6 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-lg font-semibold">Vendor Information</h2>
        <div className="space-y-4">
          {/* Vendor Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Vendor Name
            </label>
            <input
              type="text"
              name="vendorName"
              className="w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* Shop Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">Shop Name</label>
            <input
              type="text"
              name="shopName"
              className="w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input
              type="number"
              name="phone"
              className="w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* email */}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* nid */}
          <div>
            <label className="mb-1 block text-sm font-medium">NID</label>
            <input
              type="text"
              name="nid"
              className="w-full rounded-md border p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <button className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorUpdateProfile;

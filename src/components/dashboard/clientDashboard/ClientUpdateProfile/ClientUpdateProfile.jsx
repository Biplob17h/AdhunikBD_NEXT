"use client";

import React from "react";
import useUser from "@/hooks/UserHook";
import { toast } from "react-hot-toast"; // Make sure to import toast for notifications
import { useRouter } from "next/navigation";

const ClientUpdateProfile = ({ show, setShow }) => {
  const { user, userRef, setUserRef } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const updatedUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      dateOfBirth: e.target.dateOfBirth.value,
      gender: e.target.gender.value,
      nid: e.target.nid.value,
      address: e.target.address.value,
    };

    try {
      // Send the PUT request to update the user
      const response = await fetch("/api/user/update/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      // Check for successful response
      if (response.ok) {
        const result = await response.json();
        toast.success("Profile updated successfully!");
        setUserRef(userRef + 1);
        window.scrollTo(0, 0);
        router.push("/dashboard");
      } else {
        // If the request failed, show an error toast
        const error = await response.json();
        toast.error(error.message || "Failed to update profile");
      }
    } catch (error) {
      // Handle any network or other errors
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100 ${show === "update" ? "" : "hidden"}`}
    >
      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Update Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name || ""}
                placeholder="Enter your full name"
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email || ""}
                placeholder="Enter your email"
                className="input-field"
              />
            </div>
          </div>

          {/* Phone & DOB */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={user?.phone || ""}
                placeholder="Enter your phone number"
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                defaultValue={user?.dateOfBirth || ""}
                className="input-field"
              />
            </div>
          </div>

          {/* Gender & NID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                defaultValue={user?.gender || ""}
                className="input-field"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                NID Number
              </label>
              <input
                type="text"
                name="nid"
                defaultValue={user?.nid || ""}
                placeholder="Enter your NID"
                className="input-field"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-1 block font-medium text-gray-600">
              Address
            </label>
            <textarea
              name="address"
              defaultValue={user?.address || ""}
              placeholder="Enter your address"
              className="input-field h-36"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientUpdateProfile;

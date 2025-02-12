"use client";
import useUser from "@/hooks/UserHook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VendorDashboardSidebar = () => {
  const [vendorShow, setVendorShow] = useState("home");
  const router = useRouter();

  const { userLogout } = useUser();
  return (
    <div>
      {/* Sidebar */}
      <aside className="min-h-screen h-full w-[350px] bg-white p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Vendor Panel</h1>
        <nav className="flex flex-col gap-2">
          {/* Home Button */}
          <button
            onClick={() => {
              setVendorShow("home"), router.push("/dashboard/vendor");
            }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "home"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Home
          </button>

          {/* Order button */}
          <button
            onClick={() => {
              setVendorShow("order"), router.push("/dashboard/vendor/order");
            }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "order"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Orders
          </button>

          {/* Order button */}
          <button
            onClick={() => {
                setVendorShow("expert"), router.push("/dashboard/vendor/expert");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "expert"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Experts
          </button>

          {/* Location and service button */}
          <button
            onClick={() => {
                setVendorShow("location"), router.push("/dashboard/vendor/locationAndService");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "location"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Location And Service
          </button>
          {/* Review button */}
          <button
            onClick={() => {
                setVendorShow("review"), router.push("/dashboard/vendor/review");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "review"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Reviews
          </button>
          {/* Reports button */}
          <button
            onClick={() => {
                setVendorShow("report"), router.push("/dashboard/vendor/report");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "report"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Reports
          </button>
          {/* Update Profile Button */}
          <button
            onClick={() => {
                setVendorShow("update"), router.push("/dashboard/vendor/profile/update");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "update"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Update Profile
          </button>
          {/* Change Password Button */}
          <button
            onClick={() => {
                setVendorShow("password"), router.push("/dashboard/vendor/password");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              vendorShow === "password"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Change Password
          </button>
          {/* Logout Button */}
          <button
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200`}
            onClick={() => {
              userLogout();
            }}
          >
            Logout
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default VendorDashboardSidebar;

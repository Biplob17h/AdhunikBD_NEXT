"use client";
import useUser from "@/hooks/UserHook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminDashboardSideBar = () => {
  const [adminShow, setAdminShow] = useState("home");
  const router = useRouter();
  const { userLogout } = useUser();
  return (
    <div>
      {/* Sidebar */}
      <aside className="w-[350px] bg-white p-4 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {/* Home Button */}
          <button
            onClick={() => {
              setAdminShow("home"), router.push("/dashboard/admin");
            }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "home"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Home
          </button>

          {/* Order button */}
          <button
            onClick={() => {
              setAdminShow("order"), router.push("/dashboard/admin/order");
            }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "order"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Orders
          </button>
          {/* Location button */}
          <button
            onClick={() => {
                setAdminShow("location"), router.push("/dashboard/admin/location");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "location"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Location
          </button>
          {/* service button */}
          <button
            onClick={() => {
                setAdminShow("service"), router.push("/dashboard/admin/service");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "service"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Service
          </button>
          {/* Report button */}
          <button
            onClick={() => {
                setAdminShow("report"), router.push("/dashboard/admin/report");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "report"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Report
          </button>
          {/* Offers button */}
          <button
            onClick={() => {
                setAdminShow("offers"), router.push("/dashboard/admin/offers");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "offers"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Offers
          </button>
          {/* Promo Code button */}
          <button
            onClick={() => {
                setAdminShow("promo"), router.push("/dashboard/admin/promoCode");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "promo"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Promo Code
          </button>
          {/* Update Profile Button */}
          <button
            onClick={() => {
                setAdminShow("update"), router.push("/dashboard/admin/profile/update");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "update"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Update Profile
          </button>
          {/* Change Password Button */}
          <button
            onClick={() => {
                setAdminShow("password"), router.push("/dashboard/admin/password");
              }}
            className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
              adminShow === "password"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Change Password
          </button>
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

export default AdminDashboardSideBar;

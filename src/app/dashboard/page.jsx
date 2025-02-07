"use client"
import AdminDashboard from "@/components/dashboard/adminDashboard/AdminDashboard";
import ClientDashboard from "@/components/dashboard/clientDashboard/ClientDashboard";
import VendorDashboard from "@/components/dashboard/vendorDashboard/VendorDashboard";
import useUser from "@/hooks/UserHook";
import React from "react";

const page = () => {
  const { user } = useUser();
  return (
    <div>
      <div className={user?.role === "admin" ? "" : "hidden"}>
        <AdminDashboard />
      </div>
      <div className={user?.role === "vendor" ? "" : "hidden"}>
        <VendorDashboard />
      </div>
      <div className={user?.role === "user" ? "" : "hidden"}>
        <ClientDashboard />
      </div>
    </div>
  );
};

export default page;

"use client";
import AdminAllVendorRequest from "@/components/dashboard/adminDashboard/AdminVendorSidebar/AdminAllVendorRequest/AdminAllVendorRequest";
import AdminShowAllVendor from "@/components/dashboard/adminDashboard/AdminVendorSidebar/AdminShowAllVendor/AdminShowAllVendor";
import React, { useState } from "react";

const AdminVendorSidebar = () => {
  const [vendorShow, setVendorShow] = useState("manage");

  return (
    <div className="p-6">
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            vendorShow === "manage"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setVendorShow("manage")}
        >
          Manage Vendor
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            vendorShow === "request"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setVendorShow("request")}
        >
          Vendor Request
        </button>
      </div>

      <div className={`${vendorShow === "manage" ? "block" : "hidden"}`}>
        <AdminShowAllVendor />
      </div>
      <div className={`${vendorShow === "request" ? "block" : "hidden"}`}>
        <AdminAllVendorRequest />
      </div>
    </div>
  );
};

export default AdminVendorSidebar;

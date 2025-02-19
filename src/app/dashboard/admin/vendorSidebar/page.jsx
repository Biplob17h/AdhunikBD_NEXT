"use client";
import AdminAllVendorRequest from "@/components/dashboard/adminDashboard/AdminVendorSidebar/AdminAllVendorRequest/AdminAllVendorRequest";
import AdminShowAllVendor from "@/components/dashboard/adminDashboard/AdminVendorSidebar/AdminShowAllVendor/AdminShowAllVendor";
import useVendorByStatus from "@/hooks/getVendorHook";
import React, { useState } from "react";

const AdminVendorSidebar = () => {
  const [vendorShow, setVendorShow] = useState("manage");
  const { vendors, setVendorStatusRef, vendorRequests, vendorStatusLoading } =
    useVendorByStatus();

  return (
    <div className="p-6">
      {/* Toggle Buttons */}
      {/* <div className="mb-4 flex border-b-2 border-gray-300">
        {["manage", "request"].map((type) => (
          <button
            key={type}
            className={`flex-1 border-b-2 py-2 text-center transition-colors ${
              vendorShow === type
                ? "border-blue-500 text-blue-500"
                : "border-transparent"
            } hover:border-blue-500`}
            onClick={() => setVendorShow(type)}
          >
            {type === "manage" ? "Manage Vendor" : "Vendor Request"}
          </button>
        ))}
      </div> */}

      {/* Conditional Rendering */}
      <AdminShowAllVendor
        vendors={vendors}
        vendorStatusLoading={vendorStatusLoading}
      />
      {/* {vendorShow === "request" && (
        <AdminAllVendorRequest
          vendors={vendors}
          setVendorStatusRef={setVendorStatusRef}
          setVendorShow={setVendorShow}
          vendorRequests={vendorRequests}
        />
      )} */}
    </div>
  );
};

export default AdminVendorSidebar;

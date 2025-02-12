'use client'
import VendorExpertAdd from "@/components/dashboard/vendorDashboard/VendorExpert/VendorExpertAdd/VendorExpertAdd";
import VendorExpertManage from "@/components/dashboard/vendorDashboard/VendorExpert/VendorExpertManage/VendorExpertManage";
import React, { useState } from "react";

const VendorExpert = () => {
  const [expertShow, setExpertShow] = useState("manage");

  return (
    <div className={``}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${expertShow === "manage" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setExpertShow("manage")}
        >
          Manage
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${expertShow === "add" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setExpertShow("add")}
        >
          Add Expert
        </button>
      </div>

      <div className={`${expertShow === "manage" ? "block" : "hidden"}`}>
        <VendorExpertManage />
      </div>
      <div className={`${expertShow === "add" ? "block" : "hidden"}`}>
        <VendorExpertAdd />
      </div>
    </div>
  );
};

export default VendorExpert;

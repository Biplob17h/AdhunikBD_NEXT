"use client";
import VendorFinishedOrder from "@/components/dashboard/vendorDashboard/VendorOrder/VendorFinishedOrder/VendorFinishedOrder";
import VendorNewOrder from "@/components/dashboard/vendorDashboard/VendorOrder/VendorNewOrder/VendorNewOrder";
import VendorOngoingOrder from "@/components/dashboard/vendorDashboard/VendorOrder/VendorOngogingOrder/VendorOngogingOrder";
import React, { useState } from "react";

const VendorOrder = () => {
  const [orderShow, setOrderShow] = useState("new");

  return (
    <div className={``}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${orderShow === "new" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setOrderShow("new")}
        >
          New
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${orderShow === "ongoing" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setOrderShow("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${orderShow === "finished" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setOrderShow("finished")}
        >
          Finished
        </button>
      </div>

      <div className={`${orderShow === "new" ? "block" : "hidden"}`}>
        <VendorNewOrder />
      </div>
      <div className={`${orderShow === "ongoing" ? "block" : "hidden"}`}>
        <VendorOngoingOrder />
      </div>
      <div className={`${orderShow === "finished" ? "block" : "hidden"}`}>
        <VendorFinishedOrder />
      </div>
    </div>
  );
};

export default VendorOrder;

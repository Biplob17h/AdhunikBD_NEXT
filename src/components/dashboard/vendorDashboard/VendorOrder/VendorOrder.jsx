"use client";
import React, { useState } from "react";
import VendorNewOrder from "./VendorNewOrder/VendorNewOrder";
import VendorFinishedOrder from "./VendorFinishedOrder/VendorFinishedOrder";
import VendorOngoingOrder from "./VendorOngogingOrder/VendorOngogingOrder";

const VendorOrder = ({ vendorShow, setVendorShow }) => {
  const [orderShow, setOrderShow] = useState("new");

  return (
    <div className={`${vendorShow === "order" ? "" : "hidden"}`}>
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

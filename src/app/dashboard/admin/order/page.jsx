'use client'
import AdminFinishedOrders from "@/components/dashboard/adminDashboard/AdminOrders/AdminFinishedOrders/AdminFinishedOrders";
import AdminNewOrders from "@/components/dashboard/adminDashboard/AdminOrders/AdminNewOrders/AdminNewOrders";
import AdminOngoingOrders from "@/components/dashboard/adminDashboard/AdminOrders/AdminOngoingOrders/AdminOngoingOrders";
import React, { useState } from "react";

const AdminOrders = () => {
  const [orderShow, setOrderShow] = useState("new");

  return (
    <div className={``}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            orderShow === "new"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setOrderShow("new")}
        >
          New Orders
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            orderShow === "ongoing"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setOrderShow("ongoing")}
        >
          Ongoing Orders
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            orderShow === "finished"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setOrderShow("finished")}
        >
          Finished Orders
        </button>
      </div>

      <div className={`${orderShow === "new" ? "block" : "hidden"}`}>
        <AdminNewOrders />
      </div>
      <div className={`${orderShow === "ongoing" ? "block" : "hidden"}`}>
        <AdminOngoingOrders />
      </div>
      <div className={`${orderShow === "finished" ? "block" : "hidden"}`}>
        <AdminFinishedOrders />
      </div>
    </div>
  );
};

export default AdminOrders;

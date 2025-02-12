'use client'
import AdminServiceAdd from "@/components/dashboard/adminDashboard/AdminService/AdminServiceAdd/AdminServiceAdd";
import AdminServiceManage from "@/components/dashboard/adminDashboard/AdminService/AdminServiceManage/AdminServiceManage";
import React, { useState } from "react";

const AdminService = () => {
  const [serviceShow, setServiceShow] = useState("manage");

  return (
    <div className={``}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            serviceShow === "manage"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setServiceShow("manage")}
        >
          Manage Service Categories
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            serviceShow === "add"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setServiceShow("add")}
        >
          Add Service Category
        </button>
      </div>

      <div className={`${serviceShow === "manage" ? "block" : "hidden"}`}>
        <AdminServiceManage />
      </div>
      <div className={`${serviceShow === "add" ? "block" : "hidden"}`}>
        <AdminServiceAdd
          serviceShow={serviceShow}
          setServiceShow={setServiceShow}
        />
      </div>
    </div>
  );
};

export default AdminService;

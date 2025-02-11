import React, { useState } from "react";
import AdminServiceManage from "./AdminServiceManage/AdminServiceManage";
import AdminServiceAdd from "./AdminServiceAdd/AdminServiceAdd";

const AdminService = ({ adminShow, setAdminShow }) => {
  const [serviceShow, setServiceShow] = useState("manage");

  return (
    <div className={`${adminShow === "service" ? "block" : "hidden"}`}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            serviceShow === "manage"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setServiceShow("manage")}
        >
          Manage Services
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            serviceShow === "add"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setServiceShow("add")}
        >
          Add Service
        </button>
      </div>

      <div className={`${serviceShow === "manage" ? "block" : "hidden"}`}>
        <AdminServiceManage />
      </div>
      <div className={`${serviceShow === "add" ? "block" : "hidden"}`}>
        <AdminServiceAdd />
      </div>
    </div>
  );
};

export default AdminService;

import React, { useState } from "react";
import AdminLocationManage from "./AdminLocationManage/AdminLocationManage";
import AdminLocationAdd from "./AdminLocationAdd/AdminLocationAdd";

const AdminLocation = ({ adminShow, setAdminShow }) => {
  const [locationShow, setLocationShow] = useState("manage");

  return (
    <div className={`${adminShow === "location" ? "block" : "hidden"}`}>
      <div className="flex border-b-2 border-gray-300 mb-4">
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            locationShow === "manage" ? "border-blue-500 text-blue-500" : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setLocationShow("manage")}
        >
          Manage Locations
        </button>
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            locationShow === "add" ? "border-blue-500 text-blue-500" : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setLocationShow("add")}
        >
          Add Locations
        </button>
      </div>

      <div className={`${locationShow === "manage" ? "block" : "hidden"}`}>
        <AdminLocationManage/>
      </div>
      <div className={`${locationShow === "add" ? "block" : "hidden"}`}>
        <AdminLocationAdd/>
      </div>
    </div>
  );
};

export default AdminLocation;

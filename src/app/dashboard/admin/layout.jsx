import AdminDashboardSideBar from "@/components/dashboard/adminDashboard/AdminDashboardSideBar/AdminDashboardSideBar";
import AdminNavbar from "@/components/dashboard/adminDashboard/AdminNavbar/AdminNavbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <div className="w-[350px]">
          <AdminDashboardSideBar />
        </div>
        <div className="w-full mt-5">{children}</div>
      </div>
    </div>
  );
};

export default layout;

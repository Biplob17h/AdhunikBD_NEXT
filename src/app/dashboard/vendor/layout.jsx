import VendorDashboardSidebar from "@/components/dashboard/vendorDashboard/VendorDashboardSidebar/VendorDashboardSidebar";
import VendorNavbar from "@/components/dashboard/vendorDashboard/VendorNavbar/VendorNavbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <VendorNavbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[350px] bg-gray-100 min-h-screen h-full">
          <VendorDashboardSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

import ClientDashboardSidebar from "@/components/dashboard/clientDashboard/ClientDashboardSidebar/ClientDashboardSidebar";
import FooterSection from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-20 mt-5 flex">
        <div className="w-[450px]">
          <ClientDashboardSidebar />
        </div>
        <div className="w-full">{children}</div>
      </div>
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default layout;

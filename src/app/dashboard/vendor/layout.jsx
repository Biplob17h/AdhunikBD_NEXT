import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./AppSidebar";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-5 shadow-md">
          <SidebarTrigger />
          <Nav />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;

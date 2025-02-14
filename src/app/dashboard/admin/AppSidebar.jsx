"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Vendor from "@/models/vendorModel";
import {
  AirVent,
  Contact,
  Flag,
  Home,
  ListOrdered,
  MapPin,
  Star,
  Tag,
  TicketPercent,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Order",
    url: "/dashboard/admin/order",
    icon: ListOrdered,
  },
  {
    title: "users",
    url: "/dashboard/admin/userSidebar",
    icon: User,
  },
  {
    title: "Vendors",
    url: "/dashboard/admin/vendorSidebar",
    icon: Users,
  },
  {
    title: "Location",
    url: "/dashboard/admin/location",
    icon: MapPin,
  },
  {
    title: "Service",
    url: "/dashboard/admin/service",
    icon: Wrench,
  },
  {
    title: "Report",
    url: "/dashboard/admin/report",
    icon: Flag,
  },
];

const AppSidebar = () => {
  const currentRoute = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span className="text-xl">Vendor</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentRoute === item.url}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

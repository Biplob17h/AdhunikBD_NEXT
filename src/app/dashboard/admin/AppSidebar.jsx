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
    title: "Expert",
    url: "/dashboard/vendor/expert",
    icon: Contact,
  },
  {
    title: "Location",
    url: "/dashboard/vendor/location",
    icon: MapPin,
  },
  {
    title: "Service",
    url: "/dashboard/vendor/service",
    icon: Wrench,
  },
  {
    title: "Report",
    url: "/dashboard/vendor/report",
    icon: Flag,
  },
  {
    title: "Offer",
    url: "/dashboard/vendor/offers",
    icon: Tag,
  },
  {
    title: "Promo Code",
    url: "/dashboard/vendor/promoCode",
    icon: TicketPercent,
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

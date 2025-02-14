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
} from "lucide-react";
import React from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/vendor/",
    icon: Home,
  },
  {
    title: "Order",
    url: "/dashboard/vendor/order",
    icon: ListOrdered,
  },
  {
    title: "Expert",
    url: "/dashboard/vendor/expert",
    icon: Contact,
  },
  {
    title: "Location & Service",
    url: "/dashboard/vendor/locationAndService",
    icon: MapPin,
  },
  {
    title: "Review",
    url: "/dashboard/vendor/review",
    icon: Star,
  },
  {
    title: "Report",
    url: "/dashboard/vendor/report",
    icon: Flag,
  },
];

const AppSidebar = () => {
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
                  <SidebarMenuButton asChild>
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

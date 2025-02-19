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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Home,
  ListOrdered,
  User,
  Users,
  MapPin,
  Wrench,
  Flag,
  TicketPercent,
  ChevronRight,
  GitPullRequestDraft,
  Kanban,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/dashboard/admin/order",
    icon: ListOrdered,
  },
  {
    title: "Agents",
    url: "/dashboard/admin/agents",
    icon: User,
  },
  {
    title: "Users",
    url: "/dashboard/admin/userSidebar",
    icon: User,
  },
  {
    title: "Vendors",
    url: "/dashboard/admin/vendorSidebar",
    icon: Users,
  },
  {
    title: "Requests",
    icon: GitPullRequestDraft,
    subItems: [
      {
        title: "Location Requests",
        url: "/dashboard/admin/location/request",
      },
      {
        title: "Vendor Requests",
        url: "/dashboard/admin/location/add",
      },
      {
        title: "Service Requests",
        url: "/dashboard/admin/location/add",
      },
      {
        title: "Expert Requests",
        url: "/dashboard/admin/expert",
      },
    ],
  },
  {
    title: "Management",
    icon: Kanban,
    subItems: [
      {
        title: "Manage Locations",
        url: "/dashboard/admin/location/manage",
      },
      {
        title: "Manage Services",
        url: "/dashboard/admin/service",
      },
    ],
  },
  {
    title: "Complain",
    url: "/dashboard/admin/report",
    icon: Flag,
  },
  {
    title: "Coupons",
    url: "/dashboard/admin/coupon",
    icon: TicketPercent,
  },
];

const AppSidebar = () => {
  const currentRoute = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span
                onClick={() => {
                  router.push("/");
                }}
                className="cursor-pointer text-xl"
              >
                Admin
              </span>
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
                <React.Fragment key={item.title}>
                  {item.subItems ? (
                    <Collapsible className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSub key={subItem.title}>
                            <SidebarMenuSubItem>
                              <Link href={subItem.url}>
                                <SidebarMenuSubButton
                                  isActive={currentRoute === subItem.url}
                                >
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <Link href={item.url}>
                        <SidebarMenuButton isActive={currentRoute === item.url}>
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

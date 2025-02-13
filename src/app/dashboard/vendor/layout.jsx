import VendorDashboardSidebar from "@/components/dashboard/vendorDashboard/VendorDashboardSidebar/VendorDashboardSidebar";
import VendorNavbar from "@/components/dashboard/vendorDashboard/VendorNavbar/VendorNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Mail, AlertCircle, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Layout = ({ children }) => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "message",
      message: "You have a new message from John Doe.",
      date: "2024-02-20",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      message: "Your service request #1234 has been completed.",
      date: "2024-02-19",
      read: true,
    },
    {
      id: 3,
      type: "success",
      message: "Your account has been successfully verified.",
      date: "2024-02-18",
      read: true,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex h-16 items-center justify-between px-5 shadow-md sticky top-0 bg-white z-10">
          <SidebarTrigger />
          <div className="flex items-center gap-5">
            {/* Notification Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative">
                  <Bell className="h-5 w-5" />
                  {/* Notification Badge */}
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-2">
                <DropdownMenuLabel className="text-lg font-semibold">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md"
                  >
                    {/* Notification Icon */}
                    <div className="flex-shrink-0">
                      {notification.type === "message" && (
                        <Mail className="h-5 w-5 text-blue-500" />
                      )}
                      {notification.type === "alert" && (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                      {notification.type === "success" && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {/* Notification Content */}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.date}</p>
                    </div>
                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
                {/* View All Notifications Link */}
                <DropdownMenuItem className="justify-center">
                  <Link href="/dashboard/vendor/notifications" className="text-sm text-blue-500">
                    View All Notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Leon Ali</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/vendor/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
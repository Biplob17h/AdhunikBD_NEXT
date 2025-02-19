"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Mail,
  AlertCircle,
  CheckCircle,
  User,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import useUser from "@/hooks/UserHook";

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

const Nav = () => {
  const { userLogout, user } = useUser();
  
  return (
    <div className="flex items-center gap-5">
      {/* Notification Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            {/* Notification Badge */}
            {notifications.some((n) => !n.read) && (
              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
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
              className="flex items-start gap-3 rounded-md p-2 hover:bg-gray-50"
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
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </DropdownMenuItem>
          ))}
          {/* View All Notifications Link */}
          <Link href="/dashboard/admin/notifications">
            <DropdownMenuItem className="justify-center text-sm text-blue-500">
              View All Notifications
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={user?.photo ? user?.photo : "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 w-[200px] cursor-pointer">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/dashboard/admin/profile">
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/admin/settings">
            <DropdownMenuItem>
              <User />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => userLogout()}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;

"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, AlertCircle, CheckCircle, Bell, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
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
    {
      id: 4,
      type: "message",
      message: "New review received for your service.",
      date: "2024-02-17",
      read: false,
    },
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    readStatus: "",
  });

  // Filtered notifications
  const filteredNotifications = notifications.filter((notification) => {
    return (
      notification.message
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      (filters.type ? notification.type === filters.type : true) &&
      (filters.readStatus
        ? filters.readStatus === "read"
          ? notification.read
          : !notification.read
        : true)
    );
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Bell className="h-8 w-8" />
          Notifications
        </h1>
        <Button onClick={markAllAsRead}>Mark All as Read</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <Input
            placeholder="Search notifications..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          {/* Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>

          {/* Read Status Filter */}
          <Select
            value={filters.readStatus}
            onValueChange={(value) =>
              setFilters({ ...filters, readStatus: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by read status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
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

              {/* Unread Indicator and Actions */}
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Badge variant="outline" className="bg-blue-500 text-white">
                    New
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

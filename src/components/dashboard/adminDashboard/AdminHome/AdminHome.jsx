"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  RefreshCw,
  Plus,
  User,
  Shield,
  Activity,
  Clock,
  List,
  AlertCircle,
  X,
  CheckCircle,
  DollarSign,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminHomePage() {
  // New stats state
  const [stats, setStats] = useState({
    totalOngoingOrder: 15,
    totalOrder: 120,
    totalComplain: 8,
    totalCancelOrder: 5,
    totalServeOrder: 100,
    totalServeOrderAmount: 4500,
    todayScheduleOrder: 20,
    totalOngoingComplain: 3,
  });

  // ... rest of your existing state and functions
  // Refresh vendors (simulate fetching new data)
  const refreshVendors = () => {
    console.log("Refreshing vendors...");
    // Add logic to fetch new data from the API
  };

  return (
    <div className="space-y-6 p-6">
      {/* New Stats Cards Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {/* Total Ongoing Order */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Ongoing Order
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOngoingOrder}</div>
          </CardContent>
        </Card>

        {/* Total Order */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Order</CardTitle>
            <List className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrder}</div>
          </CardContent>
        </Card>

        {/* Total Complain */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Complain
            </CardTitle>
            <AlertCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplain}</div>
          </CardContent>
        </Card>

        {/* Total Cancel Order */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Cancel Order
            </CardTitle>
            <X className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCancelOrder}</div>
          </CardContent>
        </Card>

        {/* Total Serve Order */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Serve Order
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServeOrder}</div>
          </CardContent>
        </Card>

        {/* Total Serve Order Amount */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Serve Order Amount
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalServeOrderAmount}
            </div>
          </CardContent>
        </Card>

        {/* Today Schedule Order */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today Schedule Order
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayScheduleOrder}</div>
          </CardContent>
        </Card>

        {/* Total Ongoing Complain */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Ongoing Complain
            </CardTitle>
            <AlertTriangle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalOngoingComplain}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client"; // Mark this as a Client Component

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
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function OrderAssignmentPage() {
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      service: "AC Repair",
      date: "2024-02-20",
      status: "Pending",
      assignedTo: null,
    },
    {
      id: 2,
      customer: "Jane Smith",
      service: "Oven Installation",
      date: "2024-02-19",
      status: "Assigned",
      assignedTo: "Mike Johnson",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      service: "Refrigerator Maintenance",
      date: "2024-02-18",
      status: "Completed",
      assignedTo: "Sarah Lee",
    },
  ]);

  // Sample vendors data
  const vendors = [
    { id: 1, name: "John Doe", services: ["AC Repair", "Oven Installation"] },
    { id: 2, name: "Jane Smith", services: ["Refrigerator Maintenance"] },
    { id: 3, name: "Mike Johnson", services: ["Washing Machine Repair"] },
  ];

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: null,
  });

  // State for assigning a vendor to an order
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    return (
      order.customer.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? order.status === filters.status : true) &&
      (filters.date ? order.date === format(filters.date, "yyyy-MM-dd") : true)
    );
  });

  // Assign a vendor to an order
  const assignVendor = () => {
    if (!selectedOrder || !selectedVendor) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder
          ? { ...order, status: "Assigned", assignedTo: selectedVendor }
          : order,
      ),
    );

    setSelectedOrder(null);
    setSelectedVendor(null);
  };

  // Refresh orders (simulate fetching new data)
  const refreshOrders = () => {
    console.log("Refreshing orders...");
    // Add logic to fetch new data from the API
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Assignment</h1>
        <Button onClick={refreshOrders}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
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
            placeholder="Search orders..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Assigned">Assigned</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {filters.date ? format(filters.date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.date}
                onSelect={(date) => setFilters({ ...filters, date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Pending"
                          ? "destructive"
                          : order.status === "Assigned"
                            ? "warning"
                            : "success"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.assignedTo || (
                      <span className="text-muted-foreground">
                        Not Assigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order.id)}
                        >
                          Assign Vendor
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Assign Vendor</AlertDialogTitle>
                          <div className="space-y-1">
                            <Label>Select Vendor</Label>
                            <Select
                              value={selectedVendor}
                              onValueChange={(value) =>
                                setSelectedVendor(value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a vendor" />
                              </SelectTrigger>
                              <SelectContent>
                                {vendors.map((vendor) => (
                                  <SelectItem
                                    key={vendor.id}
                                    value={vendor.name}
                                  >
                                    {vendor.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setSelectedOrder(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={assignVendor}>
                            Assign
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

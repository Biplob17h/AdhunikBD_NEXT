"use client";
import useUser from "@/hooks/UserHook";
import useUserOrders from "@/hooks/userOrdersHook";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const ClientDashboardOrder = () => {
  const { user } = useUser();
  const { orders, orderLoading } = useUserOrders(user?._id);
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  if (orderLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <div className="text-sm text-gray-500">Today: {currentDate}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            Order List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Problem</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    onClick={() => router.push(`/profile/user/single/${order._id}`)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-gray-100"
                  >
                    <TableCell>{order.service.name}</TableCell>
                    <TableCell>{order.customerEmail}</TableCell>
                    <TableCell>{order.customerPhone}</TableCell>
                    <TableCell>{order.location}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.problem}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>${order.totalPrice || order.service.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboardOrder;

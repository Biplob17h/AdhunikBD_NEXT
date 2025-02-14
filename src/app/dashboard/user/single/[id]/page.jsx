"use client";
import useSingleOrder from "@/hooks/singleOrderHook";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const ClientOrderSinglePage = () => {
  const { id } = useParams();
  const { isLoading, order } = useSingleOrder(id);
  const router = useRouter();

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  }

  if (!order) {
    return <p className="text-center text-red-500">Order not found!</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Order Details</h1>

      {/* Order Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Order Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <p>
            <span className="font-medium">Order ID:</span> {order._id}
          </p>
          <p>
            <span className="font-medium">Status:</span>
            <span className="ml-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
              {order.status}
            </span>
          </p>
          <p>
            <span className="font-medium">Order Date:</span>{" "}
            {format(new Date(order.orderAt), "PPpp")}
          </p>
          <p>
            <span className="font-medium">Scheduled Date:</span> {order.date} (
            {order.time})
          </p>
          <p>
            <span className="font-medium">Total Price:</span> $
            {order.totalPrice}
          </p>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={order.user.photo} alt={order.user.name} />
            <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{order.user.name}</p>
            <p className="text-gray-500">{order.user.email}</p>
            <p>{order.user.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Service Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <p>
            <span className="font-medium">Service Name:</span>{" "}
            {order.service.name}
          </p>
          <p>
            <span className="font-medium">Category:</span> {order.subCategory}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${order.service.price}
          </p>
          <p>
            <span className="font-medium">Problem:</span> {order.problem}
          </p>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Service Location</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            <span className="font-medium">Area:</span> {order.area}
          </p>
          <p>
            <span className="font-medium">Road:</span> {order.road}
          </p>
          <p>
            <span className="font-medium">House:</span> {order.house}
          </p>
          <p>
            <span className="font-medium">City:</span> {order.location}
          </p>
        </CardContent>
      </Card>

      {/* Order Actions */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => {
            router.push(`/dashboard/user/reports/new/${id}`)
          }}
          variant="outline"
          className="bg-red-600 text-white hover:bg-red-700 hover:text-white"
        >
          Report
        </Button>
      </div>
    </div>
  );
};

export default ClientOrderSinglePage;

"use client";
import useSingleOrder from "@/hooks/singleOrderHook";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const ClientOrderSinglePage = () => {
  const { id } = useParams();
  const { isLoading, order } = useSingleOrder(id);
  const router = useRouter();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const [recipient, setRecipient] = useState("admin");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(order.totalPrice * 0.1);
      setError("");
    } else {
      setError("Invalid coupon code");
      setDiscount(0);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { to: recipient, text: message }]);
    setMessage("");
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading order details...</p>;
  }

  if (!order) {
    return <p className="text-center text-red-500">Order not found!</p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Order Details</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Order Information */}
        <Card className="col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">ORDER INFO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Order ID:</span>{" "}
              <span className="text-red-500">{order._id}</span>
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="rounded-md bg-blue-200 px-2 py-1">
                {order.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Created:</span>{" "}
              {format(new Date(order.orderAt), "PPpp")}
            </p>
            <p>
              <span className="font-medium">Scheduled:</span> {order.date} (
              {order.time})
            </p>
            <p>
              <span className="font-medium">Total Price:</span> $
              {order.totalPrice}
            </p>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card className="col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">DELIVERY INFO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Delivery Mobile:</span>{" "}
              {order.user.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {order.area},{" "}
              {order.road}, {order.house}, {order.location}
            </p>
          </CardContent>
        </Card>

        {/* Resource Info */}
        <Card className="col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">RESOURCE INFO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {order.user.name}
            </p>
            <p>
              <span className="font-medium">Mobile:</span> {order.user.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {order.user.email || "N/A"}
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Change</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service List */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">SERVICE LIST</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Service Name:</span>{" "}
            {order.service.name}
          </p>
          <p>
            <span className="font-medium">Category:</span> {order.subCategory}
          </p>
          <p>
            <span className="font-medium">Scheduled Date:</span> {order.date}
          </p>
          <p>
            <span className="font-medium">Preferred Time:</span> {order.time}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${order.service.price}
          </p>
        </CardContent>
      </Card>

      {/* Coupon Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">APPLY COUPON</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex gap-4">
            <Input
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button onClick={applyCoupon} variant="default">
              Apply
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {discount > 0 && (
            <p className="text-sm text-green-500">
              Coupon applied! You saved ${discount.toFixed(2)}.
            </p>
          )}
          <p className="font-medium">
            Final Price: ${(order.totalPrice - discount).toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Chat System */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">CHAT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={recipient === "all" ? "default" : "outline"}
              onClick={() => setRecipient("all")}
            >
              Message
            </Button>
            <Button
              variant={recipient === "admin" ? "default" : "outline"}
              onClick={() => setRecipient("admin")}
            >
              Message Admin
            </Button>
            <Button
              variant={recipient === "vendor" ? "default" : "outline"}
              onClick={() => setRecipient("vendor")}
            >
              Message Vendor
            </Button>
          </div>
          <div className="h-40 overflow-y-auto border p-3 rounded-md">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`text-sm ${
                  msg.to === "admin" ? "text-blue-500" : "text-green-500"
                }`}
              >
                {msg.to}: {msg.text}
              </p>
            ))}
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage} variant="default">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report & Download Buttons */}
      <div className="flex gap-4">
        <Button variant="destructive">Report</Button>
        <Button variant="outline">Download</Button>
      </div>
    </div>
  );
};

export default ClientOrderSinglePage;

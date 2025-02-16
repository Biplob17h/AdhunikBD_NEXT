"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { FileText, Trash2 } from "lucide-react";
import { useState } from "react";

const mockReport = {
  id: "12345",
  customer: { name: "Biplob Hossain", email: "biplob@example.com" },
  vendor: { name: "leon ali", email: "leonali@example.com" },
  expert: { name: "sakin", email: "sakin@example.com" },
  service: { name: "Premium Cleaning", price: 100, coupon: "DISCOUNT10" },
  date: "2025-02-10T12:00:00Z",
  problem: "Service quality was poor.",
  messages: [
    { sender: "admin", text: "We are looking into it." },
    { sender: "vendor", text: "We will resolve this soon." },
    { sender: "user", text: "Please handle it quickly." },
  ],
};

const ReportSinglePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredMessages =
    filter === "all"
      ? mockReport.messages
      : mockReport.messages.filter((msg) => msg.sender === filter);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <FileText className="text-blue-500" /> Report Details
      </h1>

      {/* Back Button */}
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        Back
      </Button>

      {/* General Report Info */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[ 
          { label: "Report ID", value: mockReport.id },
          { label: "Reported By", value: mockReport.customer.email },
          { label: "Date", value: format(new Date(mockReport.date), "PPpp") },
          { label: "Issue", value: mockReport.problem },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent>{item.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* User, Vendor, Expert Information */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {["customer", "vendor", "expert"].map((role) => (
          <Card key={role}>
            <CardHeader>
              <CardTitle>{role.toUpperCase()} INFO</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {mockReport[role].name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {mockReport[role].email}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service & Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Service & Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-medium">Service Name:</span>{" "}
            {mockReport.service.name}
          </p>
          <p>
            <span className="font-medium">Price:</span> $
            {mockReport.service.price}
          </p>
          <p>
            <span className="font-medium">Coupon:</span>{" "}
            {mockReport.service.coupon}
          </p>
        </CardContent>
      </Card>

      {/* Communication Section */}
      <Card>
        <CardHeader>
          <CardTitle>Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            {[ 
              { key: "all", label: "All" },
              { key: "vendor", label: "Vendor" },
              { key: "user", label: "User" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                onClick={() => setFilter(key)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="h-40 overflow-y-auto rounded-md border bg-gray-50 p-3 text-sm">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <p
                  key={index}
                  className={ 
                    msg.sender === "admin" 
                      ? "text-green-500"
                      : msg.sender === "vendor"
                      ? "text-orange-500"
                      : "text-blue-500"
                  }
                >
                  {msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}:{" "}
                  {msg.text}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No messages found.</p>
            )}
          </div>

          <div className="mt-4 flex gap-4">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="default">Send</Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline">Resolve Issue</Button>
      </div>
    </div>
  );
};

export default ReportSinglePage;

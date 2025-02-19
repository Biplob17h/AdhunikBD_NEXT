"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDownToLine,
  Ban,
  Calendar,
  CalendarCheck,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  List,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

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

  const invoiceData = {
    invoiceNumber: "INV-12345",
    date: new Date().toLocaleDateString(),
    from: {
      name: "Your Company",
      address: "123 Business St, City, Country",
      email: "info@yourcompany.com",
    },
    to: {
      name: "Client Name",
      address: "456 Client St, City, Country",
      email: "client@example.com",
    },
    items: [
      {
        description: "Kitchen Hood Cleaning",
        quantity: 1,
        price: "1500.00 TK",
      },
    ],
    totalPrice: "1500 TK",
    paymentInfo: {
      totalAmount: "1500 TK",
      discount: "0 TK",
      grossAmount: "1500 TK",
      paid: "1500 TK",
      due: "0 TK",
      paymentStatus: "Paid",
    },
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

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

      <PDFDownloadLink
        document={<InvoicePDF data={invoiceData} />}
        fileName="invoice.pdf"
      >
        {({ loading }) =>
          loading ? "Loading document..." : "Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
}

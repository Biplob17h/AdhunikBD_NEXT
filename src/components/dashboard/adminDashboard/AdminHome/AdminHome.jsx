"use client"
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useSettings from "@/hooks/getSettingsHook";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownToLine,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  List,
  X,
} from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

export default function AdminHomePage() {
  const { settings, settingsLoading, setSettingsRef } = useSettings();
  const [stats, setStats] = useState({
    totalNewOrder: 15,
    totalTodayOrder: 10,
    totalOngoingOrder: 20,
    totalServedOrder: 5,
    finishedOrder: 105,
    TotalOrder: 1005,
    cancelOrder: 3,
    servedAmount: 12000,
    totalSale: 100000,
    newReport: 3,
    onGoingReport: 5,
    totalReport: 50,
  });

  const [filteredCards, setFilteredCards] = useState([]);

  // Effect to update filteredCards when settings change
  useEffect(() => {
    if (settings?.home) {
      setFilteredCards(
        statCards.filter((stat) => settings.home?.[stat.key])
      );
    }
  }, [settings]);

  if (settingsLoading) return <p>Loading...</p>;
  if (!settings?.home) return <p>Error loading settings.</p>;

  const statCards = [
    { key: "new", title: "Total New Orders", value: stats.totalNewOrder, icon: <List className="h-5 w-5" /> },
    { key: "today", title: "Total Today's Orders", value: stats.totalTodayOrder, icon: <Calendar className="h-5 w-5" /> },
    { key: "ongoing", title: "Total Ongoing Orders", value: stats.totalOngoingOrder, icon: <Clock className="h-5 w-5" /> },
    { key: "served", title: "Total Served Orders", value: stats.totalServedOrder, icon: <CheckCircle className="h-5 w-5" /> },
    { key: "finished", title: "Total Finished Orders", value: stats.finishedOrder, icon: <CheckCircle className="h-5 w-5" /> },
    { key: "total", title: "Total Orders", value: stats.TotalOrder, icon: <List className="h-5 w-5" /> },
    { key: "cancel", title: "Total Cancelled Orders", value: stats.cancelOrder, icon: <X className="h-5 w-5" /> },
    { key: "servedAmount", title: "Total Served Amount", value: `$${stats.servedAmount}`, icon: <DollarSign className="h-5 w-5" /> },
    { key: "totalSale", title: "Total Sales", value: `$${stats.totalSale}`, icon: <DollarSign className="h-5 w-5" /> },
    { key: "newReport", title: "New Reports", value: stats.newReport, icon: <AlertCircle className="h-5 w-5" /> },
    { key: "ongoingReport", title: "Ongoing Reports", value: stats.onGoingReport, icon: <AlertTriangle className="h-5 w-5" /> },
    { key: "totalReport", title: "Total Reports", value: stats.totalReport, icon: <AlertTriangle className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {filteredCards.length === 0 ? (
        <p>No stats available based on current settings.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {filteredCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

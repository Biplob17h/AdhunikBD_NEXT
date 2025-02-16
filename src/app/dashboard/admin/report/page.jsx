"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Mock Reports with meaningful data
const mockReports = [
  { id: "1", title: "Delayed Delivery", date: "2025-02-10", status: "New" },
  { id: "2", title: "Payment Discrepancy", date: "2025-02-09", status: "Resolved" },
  { id: "3", title: "Service Interruption", date: "2025-02-08", status: "Ongoing" },
  { id: "4", title: "Account Deactivation", date: "2025-02-07", status: "New" },
  { id: "5", title: "Unauthorized Access Attempt", date: "2025-02-06", status: "Ongoing" },
];

const ReportPage = () => {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredReports =
    filterStatus === "All" ? mockReports : mockReports.filter((report) => report.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Ongoing":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="text-sm text-gray-500">Total: {filteredReports.length}</div>
      </div>

      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <Select onValueChange={setFilterStatus} defaultValue="All">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Report List */}
      <Card>
        <CardHeader>
          <CardTitle>Report List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow
                    key={report.id}
                    onClick={() => router.push(`/dashboard/admin/report/${report.id}`)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell className={`font-semibold ${getStatusColor(report.status)}`}>{report.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPage;

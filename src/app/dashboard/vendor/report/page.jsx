"use client"; // Mark this as a Client Component

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { Filter, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReportsPage() {
  // Sample reports data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "AC Repair Issue",
      status: "New",
      date: "2024-02-20",
      assignedTo: "John Doe",
    },
    {
      id: 2,
      title: "Oven Installation",
      status: "Ongoing",
      date: "2024-02-19",
      assignedTo: "Jane Smith",
    },
    {
      id: 3,
      title: "Refrigerator Maintenance",
      status: "Finished",
      date: "2024-02-18",
      assignedTo: "Mike Johnson",
    },
    {
      id: 4,
      title: "Washing Machine Repair",
      status: "New",
      date: "2024-02-17",
      assignedTo: "Sarah Lee",
    },
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // Filtered reports
  const filteredReports = reports.filter((report) => {
    return (
      report.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? report.status === filters.status : true)
    );
  });

  // Refresh reports (simulate fetching new data)
  const refreshReports = () => {
    console.log("Refreshing reports...");
    // Add logic to fetch new data from the API
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button onClick={refreshReports}>
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
            placeholder="Search reports..."
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
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Finished">Finished</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === "New"
                          ? "default"
                          : report.status === "Ongoing"
                            ? "warning"
                            : "success"
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/vendor/reports/${report.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
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

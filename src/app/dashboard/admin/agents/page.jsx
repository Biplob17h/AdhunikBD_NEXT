"use client";
import React, { useState, useEffect } from "react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

// Mock data for agents with permissions
const mockAgents = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+123456789",
    address: "New York, USA",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    permissions: ["Reports", "Orders"],
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+987654321",
    address: "Los Angeles, USA",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    permissions: ["User Address", "Orders"],
  },
  {
    _id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1122334455",
    address: "Chicago, USA",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    permissions: ["Reports", "User Address", "Orders"],
  },
];

const AgentsPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agents Overview</h1>
        <div className="text-sm text-gray-500">Today: {currentDate}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAgents.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            All Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAgents.map((agent) => (
                <TableRow
                  key={agent._id}
                  onClick={() => router.push(`/dashboard/admin/agents/${agent._id}`)}
                  className="cursor-pointer transition-colors duration-150 hover:bg-gray-100"
                >
                  <TableCell>
                    <Avatar>
                      {agent.photo ? (
                        <AvatarImage src={agent.photo} alt={agent.name} />
                      ) : (
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.address}</TableCell>
                  <TableCell>{agent.phone}</TableCell>
                  <TableCell>
                    {agent.permissions.length > 0 ? (
                      <span className="text-blue-600">
                        {agent.permissions.join(", ")}
                      </span>
                    ) : (
                      <span className="text-gray-500">No Permissions</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsPage;

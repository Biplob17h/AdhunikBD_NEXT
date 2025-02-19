"use client";
import React from "react";
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
import useGetAllAgent from "@/hooks/getAllAgentsHook";

const AgentsPage = () => {
  const { agentLoading, agents } = useGetAllAgent();
  const router = useRouter();

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Agents Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents?.length || 0}</div>
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
          {agentLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : agents.length > 0 ? (
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
                {agents.map((agent) => (
                  <TableRow
                    key={agent._id}
                    onClick={() =>
                      router.push(`/dashboard/admin/agents/${agent._id}`)
                    }
                    className="cursor-pointer transition-colors duration-150 hover:bg-gray-100"
                  >
                    <TableCell>
                      <Avatar>
                        {agent.photo ? (
                          <AvatarImage src={agent.photo} alt={agent.name} />
                        ) : (
                          <AvatarFallback>
                            {agent.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.address}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>
                      {agent.access
                        ? Object.values(agent.access).filter(Boolean).length > 0
                          ? `${Object.values(agent.access).filter(Boolean).length} ${
                              Object.values(agent.access).filter(Boolean)
                                .length > 1
                                ? "Permissions"
                                : "Permission"
                            }`
                          : "No Permissions"
                        : "No Data"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-gray-500">No agents found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsPage;

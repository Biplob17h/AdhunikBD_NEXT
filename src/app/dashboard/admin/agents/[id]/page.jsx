"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Ban, CheckCircle } from "lucide-react";

// Mock agent data (replace with real API call)
const mockAgent = {
  _id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+123456789",
  address: "New York, USA",
  photo: "https://randomuser.me/api/portraits/men/1.jpg",
  permissions: ["Reports", "Orders"], // Example permissions
  blocked: false,
};

const AgentSinglePage = () => {
  const router = useRouter();
  const { id } = useParams();

  // Simulating agent data fetch (replace with actual fetch)
  const [agent, setAgent] = useState(mockAgent);
  const [permissions, setPermissions] = useState(agent.permissions);
  const [isBlocked, setIsBlocked] = useState(agent.blocked);

  // Toggle permission
  const handleTogglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission) // Remove permission
        : [...prev, permission] // Add permission
    );
  };

  // Block agent
  const handleBlockAgent = () => {
    setIsBlocked(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {/* Agent Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {agent.photo ? (
                <AvatarImage src={agent.photo} alt={agent.name} />
              ) : (
                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{agent.name}</h2>
              <p className="text-sm text-gray-500">{agent.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Phone:</strong> {agent.phone}</p>
            <p><strong>Address:</strong> {agent.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Reports", "User Address", "Orders"].map((permission) => (
            <div key={permission} className="flex items-center justify-between">
              <p>{permission}</p>
              <Button
                variant={permissions.includes(permission) ? "default" : "outline"}
                size="sm"
                onClick={() => handleTogglePermission(permission)}
              >
                {permissions.includes(permission) ? "Enabled" : "Enable"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Block Agent Button */}
      <Button
        variant="destructive"
        className="w-full"
        onClick={handleBlockAgent}
        disabled={isBlocked}
      >
        <Ban className="mr-2 h-4 w-4" />
        {isBlocked ? "Agent Blocked" : "Block Agent"}
      </Button>
    </div>
  );
};

export default AgentSinglePage;

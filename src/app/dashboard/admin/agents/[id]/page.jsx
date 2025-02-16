"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Ban } from "lucide-react";
import useSingleAgent from "@/hooks/getSingleAgentHook";
import { format } from "date-fns"; // Format date properly

const AgentSinglePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { agent, agentLoading, setAgentRef } = useSingleAgent(id);

  const [access, setAccess] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (agent) {
      setAccess(agent?.access || {}); // Set access permissions
      setIsBlocked(agent?.blocked || false);
    }
  }, [agent]);

  // Toggle access permission
  const handleToggleAccess = async (key) => {
    const updatedAccess = { ...access, [key]: !access[key] };
    setAccess(updatedAccess); // Update UI instantly

    try {
      await fetch(`/api/admin/agent/update-access`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: id, access: updatedAccess }),
      });

      setAgentRef((pre) => pre + 1); // Refresh agent data after update
    } catch (error) {
      console.error("Error updating access:", error);
    }
  };

  // Block agent
  const handleBlockAgent = async () => {
    setIsBlocked(true);
    try {
      await fetch(`/api/admin/agent/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: id, blocked: true }),
      });

      refetch();
    } catch (error) {
      console.error("Error blocking agent:", error);
    }
  };

  if (agentLoading) {
    return <p className="text-center">Loading agent details...</p>;
  }

  return (
    <div className="space-y-6 p-6">
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
              {agent?.photo ? (
                <AvatarImage src={agent.photo} alt={agent.name} />
              ) : (
                <AvatarFallback>{agent?.name?.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{agent?.name}</h2>
              <p className="text-sm text-gray-500">{agent?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              <strong>Phone:</strong> {agent?.phone}
            </p>
            <p>
              <strong>Address:</strong> {agent?.address}
            </p>
            <p>
              <strong>Date of Birth:</strong> {agent?.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong> {agent?.gender}
            </p>
            <p>
              <strong>NID:</strong> {agent?.nid}
            </p>
            <p>
              <strong>Role:</strong> {agent?.role}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Access Permissions Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(access).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <p className="capitalize">{key.replace("_", " ")}</p>
              <Button
                variant={access[key] ? "default" : "outline"}
                size="sm"
                onClick={() => handleToggleAccess(key)}
              >
                {access[key] ? "Enabled" : "Enable"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Block Agent Button */}
      <Button
        variant="destructive"
        className="w-full max-w-48"
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

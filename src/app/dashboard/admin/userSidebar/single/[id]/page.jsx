"use client";

import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, UserCheck, Ban } from "lucide-react";
import useGetUserById from "@/hooks/getUserByIdHook";
import toast from "react-hot-toast";

const UserSidebarSinglePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user, loading } = useGetUserById(id); // Fetch user data

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <div className="p-6 text-center">User not found</div>;

  const handlePromoteUser = () => {
    const confirm = window.confirm("Do you want to make this user an agent");
    if (confirm) {
      fetch("/api/admin/agent", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status === "success") {
            toast.success("Agent assign successfully");
            router.back("/dashboard/admin/agents");
          }
        });
    }
  };
  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button size="sm" variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {user.photo ? (
                <AvatarImage src={user.photo} alt={user.name} />
              ) : (
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              <strong>Phone:</strong> {user.phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.dateOfBirth || "N/A"}
            </p>
            <p>
              <strong>NID:</strong> {user.nid || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Button Block */}
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-4">
        <Button
          onClick={() => {
            handlePromoteUser();
          }}
          size="sm"
          variant="default"
          className="w-full"
        >
          <UserCheck className="mr-2 h-4 w-4" /> Promote to Agent
        </Button>
      </div>
    </div>
  );
};

export default UserSidebarSinglePage;

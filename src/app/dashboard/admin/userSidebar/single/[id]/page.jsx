"use client";

import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, UserCheck, Ban } from "lucide-react";
import useGetUserById from "@/hooks/getUserByIdHook";

const UserSidebarSinglePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user, loading } = useGetUserById(id); // Fetch user data

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <div className="p-6 text-center">User not found</div>;

  return (
    <div className="p-6 space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth || "N/A"}</p>
            <p><strong>NID:</strong> {user.nid || "N/A"}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Button Block */}
      <div className="grid grid-cols-2 gap-4">
        <Button size="sm" variant="destructive" className="w-full">
          <Ban className="mr-2 h-4 w-4" /> Block User
        </Button>
        <Button size="sm" variant="default" className="w-full">
          <UserCheck className="mr-2 h-4 w-4" /> Promote to Agent
        </Button>
      </div>
    </div>
  );
};

export default UserSidebarSinglePage;

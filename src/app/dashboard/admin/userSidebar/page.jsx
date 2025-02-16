"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllUser from "@/hooks/getAllUserHook";
import { CheckCircle, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminUserSidebar = () => {
  const { users, userLoading, setUserLoading, setUsers } = useGetAllUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Ensure hooks are initialized before returning a loading state
  if (userLoading) {
    return <div>Loading...</div>;
  }

  const router = useRouter();

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setUserLoading(true);

    fetch(`/api/user/filter?name=${name}&phone=${phone}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data?.data);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total User</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <form
        onSubmit={handleFilterSubmit}
        className="mb-6 flex items-center gap-4"
      >
        <div className="flex w-full flex-col sm:w-1/2">
          <Label htmlFor="name" className="text-sm font-medium">
            Name:
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="flex w-full flex-col sm:w-1/2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone:
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter Phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="mt-5">
          <Button
            type="submit"
            variant="outline"
            className="flex w-full items-center justify-center sm:mt-0 sm:w-auto"
          >
            <Search className="h-5 w-5" />
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </form>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            All Users
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  onClick={() => {
                    router.push(
                      `/dashboard/admin/userSidebar/single/${user?._id}`
                    );
                  }}
                  className="cursor-pointer transition-colors duration-150 hover:bg-gray-100"
                >
                  <TableCell>
                    <Avatar>
                      {user.photo ? (
                        <AvatarImage src={user.photo} alt={user.name} />
                      ) : (
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserSidebar;

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash, Check, X, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function LocationManagementPage() {
  const [locations, setLocations] = useState([
    { id: 1, name: "Gajipur" },
    { id: 2, name: "Mirpur" },
  ]);

  const [vendors, setVendors] = useState([
    { id: 1, name: "Sakline mostak sakin", email: "saklinemostak@gmail.com", servicingLocations: [1] },
    { id: 2, name: "Biplob Hossain", email: "biplob12@gmail.com", servicingLocations: [2] },
    { id: 3, name: "Leon Ali", email: "leonali56@gmail.com", servicingLocations: [1, 2] },
  ]);

  const [locationRequests, setLocationRequests] = useState([
    { id: 1, vendorId: 1, locationId: 2, status: "pending" },
  ]);

  const [newLocation, setNewLocation] = useState({ name: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddLocation = () => {
    if (!newLocation.name) return alert("Enter a location name");
    setLocations([...locations, { id: locations.length + 1, ...newLocation }]);
    setNewLocation({ name: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteLocation = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  const handleLocationRequest = (requestId, status) => {
    setLocationRequests(locationRequests.map((req) => (req.id === requestId ? { ...req, status } : req)));
    if (status === "accepted") {
      const request = locationRequests.find((req) => req.id === requestId);
      if (request) {
        setVendors(vendors.map((vendor) => vendor.id === request.vendorId
          ? { ...vendor, servicingLocations: [...vendor.servicingLocations, request.locationId] }
          : vendor
        ));
      }
    }
  };

  const filteredVendors = vendors.filter(
    (vendor) => vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Location Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Location</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="name">Location Name</Label>
              <Input id="name" name="name" value={newLocation.name} onChange={(e) => setNewLocation({ name: e.target.value })} placeholder="Enter location name" />
              <Button onClick={handleAddLocation} className="w-full">Add Location</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex max-w-[500px] items-center gap-2">
        <Input placeholder="Search vendors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1" />
        <Button variant="outline"><Search className="h-4 w-4" /></Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Vendors and Their Servicing Locations</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Locations</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.servicingLocations.map((id) => locations.find((loc) => loc.id === id)?.name).join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Location Requests</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Vendor</TableHead><TableHead>Location</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {locationRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{vendors.find((v) => v.id === request.vendorId)?.name}</TableCell>
                  <TableCell>{locations.find((l) => l.id === request.locationId)?.name}</TableCell>
                  <TableCell><Badge variant={request.status === "accepted" ? "success" : "secondary"}>{request.status}</Badge></TableCell>
                  <TableCell>
                    {request.status === "pending" && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => handleLocationRequest(request.id, "accepted")}><Check className="h-4 w-4 text-green-500" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleLocationRequest(request.id, "rejected")}><X className="h-4 w-4 text-red-500" /></Button>
                      </>
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
}

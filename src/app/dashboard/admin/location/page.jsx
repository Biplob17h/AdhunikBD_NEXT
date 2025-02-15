"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
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
import { Plus, Trash, Edit, Check, X, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function LocationManagementPage() {
  // State for locations
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Gajipur",
      address: "123 Main St, NY",
      phone: "+8801844-767694",
    },
    {
      id: 2,
      name: "Mirpur",
      address: "456 Sunset Blvd, LA",
      phone: "+8801735-973254",
    },
  ]);

  // State for vendors
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Sakline mostak sakin",
      email: "saklinemostak@gmail.com",
      servicingLocations: [1], // IDs of locations they service
    },
    {
      id: 2,
      name: "Biplob Hossain",
      email: "biplob12@gmail.com",
      servicingLocations: [2],
    },
    {
      id: 3,
      name: "Leon Ali",
      email: "leonali56@gmail.com",
      servicingLocations: [1, 2],
    },
  ]);

  // State for location requests from vendors
  const [locationRequests, setLocationRequests] = useState([
    {
      id: 1,
      vendorId: 1,
      locationId: 2, // Vendor A is requesting to service Los Angeles
      status: "pending", // pending, accepted, rejected
    },
  ]);

  // State for adding/editing location
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // State for dialog (modal) open/close
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update location
  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.address || !newLocation.phone) {
      alert("Please fill all fields");
      return;
    }

    // Add new location
    const updatedLocations = [
      ...locations,
      { id: locations.length + 1, ...newLocation },
    ];
    setLocations(updatedLocations);

    // Reset form and close dialog
    setNewLocation({ name: "", address: "", phone: "" });
    setIsDialogOpen(false);
  };

  // Delete location
  const handleDeleteLocation = (id) => {
    const updatedLocations = locations.filter((location) => location.id !== id);
    setLocations(updatedLocations);
  };

  // Handle location request (accept or reject)
  const handleLocationRequest = (requestId, status) => {
    const updatedRequests = locationRequests.map((request) =>
      request.id === requestId ? { ...request, status } : request,
    );
    setLocationRequests(updatedRequests);

    // If accepted, add the location to the vendor's servicing locations
    if (status === "accepted") {
      const request = locationRequests.find((req) => req.id === requestId);
      if (request) {
        const updatedVendors = vendors.map((vendor) =>
          vendor.id === request.vendorId
            ? {
                ...vendor,
                servicingLocations: [
                  ...vendor.servicingLocations,
                  request.locationId,
                ],
              }
            : vendor,
        );
        setVendors(updatedVendors);
      }
    }
  };

  // Remove a specific location from a vendor
  const handleRemoveLocationFromVendor = (vendorId, locationId) => {
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === vendorId
        ? {
            ...vendor,
            servicingLocations: vendor.servicingLocations.filter(
              (id) => id !== locationId,
            ),
          }
        : vendor,
    );
    setVendors(updatedVendors);
  };

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Location Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Location Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newLocation.name}
                  onChange={handleInputChange}
                  placeholder="Enter location name"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={newLocation.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newLocation.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Submit Button */}
              <Button onClick={handleAddLocation} className="w-full">
                Add Location
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar for Vendors */}
      <div className="flex max-w-[500px] items-center gap-2">
        <Input
          placeholder="Search vendors by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendors and Their Servicing Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Servicing Locations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>
                    {vendor.servicingLocations.map((locationId) => {
                      const location = locations.find(
                        (loc) => loc.id === locationId,
                      );
                      return (
                        <div
                          key={locationId}
                          className="flex items-center gap-2"
                        >
                          <span>{location?.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveLocationFromVendor(
                                vendor.id,
                                locationId,
                              )
                            }
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Implement remove all locations functionality
                        vendor.servicingLocations.forEach((locationId) =>
                          handleRemoveLocationFromVendor(vendor.id, locationId),
                        );
                      }}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                      Remove All
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Location Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Location Requests from Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Requested Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locationRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {
                      vendors.find((vendor) => vendor.id === request.vendorId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell>
                    {
                      locations.find((loc) => loc.id === request.locationId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "accepted"
                          ? "success"
                          : request.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={() =>
                            handleLocationRequest(request.id, "accepted")
                          }
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleLocationRequest(request.id, "rejected")
                          }
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
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

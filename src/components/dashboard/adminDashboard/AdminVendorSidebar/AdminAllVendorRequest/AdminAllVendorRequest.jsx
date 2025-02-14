import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import toast from "react-hot-toast";

const AdminAllVendorRequest = ({
  vendorRequests,
  setVendorStatusRef,
  setVendorShow,
}) => {
  const handleRequestApprove = (vendorId) => {
    fetch("/api/vendor/request", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "active", vendorId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Vendor approved successfully");
          setVendorStatusRef((pre) => pre + 1);
          setVendorShow("manage");
        }
      });
  };
  const handleRequestReject = (vendorId) => {
    fetch("/api/vendor/request", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "rejected", vendorId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Vendor Rejected successfully");
          setVendorStatusRef((pre) => pre + 1);
          setVendorShow("manage");
        }
      });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Vendor Requests</h1>

      {vendorRequests.length === 0 ? (
        <p className="text-gray-500">No pending vendor requests.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendorRequests.map((vendor) => (
            <Card
              key={vendor._id}
              className="p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <CardHeader className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={vendor.vendorPhoto}
                    alt={vendor.vendorName}
                  />
                  <AvatarFallback>{vendor.vendorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {vendor.vendorName}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{vendor.email}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Shop:</span>{" "}
                    {vendor.shopName || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {vendor.phone}
                  </p>
                  <p>
                    <span className="font-medium">NID:</span> {vendor.nid}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span className="ml-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      {vendor.status}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => handleRequestApprove(vendor._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="ml-5 bg-red-600 text-white hover:bg-red-700"
                    size="sm"
                    onClick={() => handleRequestReject(vendor._id)}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllVendorRequest;

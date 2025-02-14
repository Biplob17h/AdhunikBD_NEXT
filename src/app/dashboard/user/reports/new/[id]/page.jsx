"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/UserHook";

const CreateANewReport = () => {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const reportData = {
      userId: user?.id, // Ensure user.id is defined
      orderId: id, // Ensure id is defined
      title: e.target.title.value.trim(), // Trim spaces
      description: e.target.description.value.trim(),
    };
  
    console.log("Report Data:", reportData); // Debugging
  
    fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data); // Debugging
        if (data?.status === "success") {
          toast.success("Report created successfully!");
          router.back();
          e.target.reset();
        } else {
          toast.error(data?.message || "Failed to create report");
        }
      })
      .catch((error) => console.error("Error submitting report:", error));
  };
  

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Create a New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Order ID (Read-Only) */}
            <div>
              <label className="text-sm font-medium">Order ID</label>
              <Input type="text" value={id} disabled className="bg-gray-100" />
            </div>

            {/* Report Title */}
            <div>
              <label className="text-sm font-medium">Report Title</label>
              <Input
                type="text"
                name="title"
                required
                placeholder="Enter report title..."
              />
            </div>

            {/* Report Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                required
                placeholder="Describe the issue..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateANewReport;

"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/UserHook";

const VendorPassword = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    const _id = user?._id;

    if (!oldPassword || !newPassword || !confirmPassword || !_id) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      // Simulate an API call
      if (user?.role === "vendor") {
        const res = await fetch("/api/auth/vendor/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            _id,
          }),
        });

        const data = await res.json();
        if (data.status === "success") {
          toast.success("Password changed successfully");
        } else {
          toast.error(data?.message);
        }
      } else {
        const res = await fetch("/api/auth", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            _id,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          toast.success("Password changed successfully");
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-center">Change Password</h2>
      <form onSubmit={handleChangePassword} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Old Password
          </label>
          <Input
            type="password"
            name="oldPassword"
            placeholder="Enter your old password"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            New Password
          </label>
          <Input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Confirm Password
          </label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter new password"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default VendorPassword;

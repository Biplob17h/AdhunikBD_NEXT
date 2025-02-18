"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Pencil } from "lucide-react";
import { format, isPast } from "date-fns";
import toast from "react-hot-toast";
import useAllCoupon from "@/hooks/getAllCouponHook";

const CouponPage = () => {
  const { coupons, setCoupons, couponLoading, setCouponRef } = useAllCoupon();
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoupon = {
      couponId: editingId || Date.now(),
      code: form.code.value,
      type: form.type.value,
      value: Number(form.value.value),
      expirationDate: form.expirationDate.value,
    };

    try {
      console.log("Saving coupon:", newCoupon); // Debugging line

      const response = await fetch("/api/coupon", {
        method: editingId ? "PUT" : "POST", // Use PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon),
      });

      const data = await response.json();
      console.log("Coupon saved:", data); // Debugging line

      if (!response.ok) {
        throw new Error(data.message || "Failed to save coupon");
      }

      if (editingId) {
        setCoupons((prev) =>
          prev.map((c) => (c._id === editingId ? data.data : c)),
        );
      } else {
        setCoupons([...coupons, data.data]);
      }

      toast.success("Coupon created/updated successfully");
      form.reset();
      setEditingId(null);
      setCouponRef((prev) => prev + 1); // Trigger re-fetch of coupons
    } catch (error) {
      console.error("Error saving coupon:", error);
      toast.error(error.message || "Error saving coupon");
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    document.getElementById("coupon-form").code.value = coupon.code;
    document.getElementById("coupon-form").type.value = coupon.type;
    document.getElementById("coupon-form").value.value = coupon.value;
    document.getElementById("coupon-form").expirationDate.value =
      coupon.expirationDate;
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting coupon with ID:", deleteId); // Debugging line

      const response = await fetch(`/api/coupon?couponId=${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete coupon");

      toast.success("Coupon deleted successfully");
      setCoupons((prev) => prev.filter((c) => c._id !== deleteId));
      setOpenDeleteDialog(false);
      setCouponRef((prev) => prev + 1); // Trigger re-fetch of coupons
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Error deleting coupon");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Manage Coupons</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Coupon" : "Add Coupon"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="coupon-form" className="space-y-4" onSubmit={handleSave}>
            <Input name="code" placeholder="Coupon Code" required />
            <select name="type" className="w-full rounded-md border px-3 py-2">
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </select>
            <Input
              name="value"
              type="number"
              placeholder="Discount Value"
              required
            />
            <Input name="expirationDate" type="date" required />
            <Button type="submit">{editingId ? "Update" : "Add"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coupon List</CardTitle>
        </CardHeader>
        <CardContent>
          {couponLoading ? (
            <div className="py-4 text-center">
              <Spinner />{" "}
              {/* You can replace Spinner with any loading component */}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => {
                  const expired = isPast(new Date(coupon.expirationDate));
                  return (
                    <TableRow
                      key={coupon._id}
                      className={expired ? "text-red-500" : ""}
                    >
                      <TableCell>{coupon.code}</TableCell>
                      <TableCell>{coupon.type}</TableCell>
                      <TableCell>
                        {coupon.value}{" "}
                        {coupon.type === "percentage" ? "%" : "Tk"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(coupon.expirationDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleEdit(coupon)}>
                          <Pencil />
                        </Button>
                        <Button
                          className="ml-3"
                          onClick={() => {
                            setDeleteId(coupon._id);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CouponPage;

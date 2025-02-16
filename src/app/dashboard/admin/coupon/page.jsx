"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Pencil } from "lucide-react";

const CouponPage = () => {
    const [coupons, setCoupons] = useState([
        { id: 1, code: "DISCOUNT10", discount: 10 },
        { id: 2, code: "SAVE20", discount: 20 },
    ]);
    
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleSave = () => {
        if (!couponCode || !discount) return;
        if (editingId) {
            setCoupons((prev) => prev.map((c) => (c.id === editingId ? { id: c.id, code: couponCode, discount: Number(discount) } : c)));
        } else {
            setCoupons([...coupons, { id: Date.now(), code: couponCode, discount: Number(discount) }]);
        }
        setCouponCode("");
        setDiscount("");
        setEditingId(null);
    };

    const handleEdit = (coupon) => {
        setCouponCode(coupon.code);
        setDiscount(coupon.discount);
        setEditingId(coupon.id);
    };

    const handleDelete = () => {
        setCoupons((prev) => prev.filter((c) => c.id !== deleteId));
        setOpenDeleteDialog(false);
        setDeleteId(null);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-6">
            <h1 className="text-2xl font-semibold">Manage Coupons</h1>
            
            {/* Coupon Form */}
            <Card>
                <CardHeader>
                    <CardTitle>{editingId ? "Edit Coupon" : "Add Coupon"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Input
                        placeholder="Discount Percentage"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <Button onClick={handleSave}>{editingId ? "Update" : "Add"}</Button>
                </CardContent>
            </Card>
            
            {/* Coupons Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Coupon List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Discount (%)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon) => (
                                <TableRow key={coupon.id}>
                                    <TableCell>{coupon.code}</TableCell>
                                    <TableCell>{coupon.discount}%</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="icon" variant="outline" onClick={() => handleEdit(coupon)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive" onClick={() => { setDeleteId(coupon.id); setOpenDeleteDialog(true); }}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CouponPage;

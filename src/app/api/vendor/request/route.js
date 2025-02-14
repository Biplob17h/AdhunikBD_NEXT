import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectMongoDb();

  const { vendorId, status } = await req.json();

  // Find the vendor by _id
  const vendor = await Vendor.findOne({ _id: vendorId });

  if (!vendor) {
    return NextResponse.json({
      status: "error",
      message: "Vendor not found",
    });
  }

  // Update the vendor's status
  vendor.status = status;
  await vendor.save();

  return NextResponse.json({
    status: "success",
    message: "Vendor status updated successfully",
    data: vendor,
  });
}

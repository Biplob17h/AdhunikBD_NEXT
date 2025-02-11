import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";
import genId from "@/utils/genId/genId";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectMongoDb();

  const { photoUrl, phone } = await req.json();

  // Find the vendor by phone number
  const vendor = await Vendor.findOne({ phone: phone });

  if (!vendor) {
    return NextResponse.status(404).json({ message: "Vendor not found" });
  }

  //   gen id fro photo
  const photoId = genId();

  // make photo data
  const photoData = {
    _id: photoId,
    photo: photoUrl,
  };

  vendor.shopPhoto = [...vendor.shopPhoto, photoData];

  // Update the vendor data
  const result = await Vendor.updateOne(
    { phone: phone }, // The condition to find the vendor
    { $set: vendor }, // The fields to update
  );

  // Check if the update was successful
  if (result.modifiedCount === 0) {
    return NextResponse.status(500).json({ message: "Vendor update failed" });
  }

  return NextResponse.json({
    status: "success",
    message: "Vendor updated successfully",
    vendor,
  });
}

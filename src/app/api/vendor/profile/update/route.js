import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectMongoDb();

  const { photoUrl, phone, vendorName, shopName, email, nid, newPhone } =
    await req.json();

  // Find the vendor by phone number
  const vendor = await Vendor.findOne({ phone: phone });

  if (!vendor) {
    return NextResponse.status(404).json({ message: "Vendor not found" });
  }

  if(newPhone){
    vendor.phone = newPhone;
  }
  vendor.vendorPhoto = photoUrl;
  vendor.vendorName = vendorName;
  vendor.shopName = shopName;
  vendor.email = email;
  vendor.nid = nid;


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

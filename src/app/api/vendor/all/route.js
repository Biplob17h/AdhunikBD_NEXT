import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongoDb();

  // Find the vendor by phone number
  const vendor = await Vendor.find({});

  return NextResponse.json({
    status: "success",
    message: "Vendor get successfully",
    data: vendor,
  });
}

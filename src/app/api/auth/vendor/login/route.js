import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";
import { generateToken } from "@/utils/auth/generateToken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Vendor Login
export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { phone, password } = await req.json(); // Parse request body
    

    // Validate input
    if (!phone || !password) {
      return NextResponse.json(
        { status: "fail", message: "Please provide your credentials" },
        { status: 400 },
      );
    }

    // Find vendor by phone
    const vendor = await Vendor.findOne({ phone });
    if (!vendor) {
      return NextResponse.json(
        { status: "fail", message: "No vendor found" },
        { status: 400 },
      );
    }

    // Check password
    const checkPassword = await bcrypt.compare(password, vendor.password);
    if (!checkPassword) {
      return NextResponse.json(
        { status: "fail", message: "Wrong password" },
        { status: 400 },
      );
    }

    // Generate token
    const token = generateToken({userId : vendor._id, userRole: vendor.role});

    // Select vendor data (excluding password)
    const vendorData = await Vendor.findOne({ phone }).select([
      "-password",
      "-_id",
    ]);

    // Send success response
    return NextResponse.json(
      {
        status: "success",
        message: "Vendor signed in successfully",
        data: { vendorData, token },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 400 },
    );
  }
}

import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure the database is connected

    const { phone, password, name } = await req.json(); // Fix async issue
    console.log({ phone, password, name });

    // Check credentials
    if (!name || !phone || !password) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Please provide your credentials",
        },
        { status: 400 },
      );
    }

    // Check if phone number is from BD
    if (phone[0] !== "0" || phone[1] !== "1" || phone.length !== 11) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Please provide a correct phone number",
        },
        { status: 400 },
      );
    }

    // Check if vendor already exists
    const oldVendor = await Vendor.findOne({ phone });
    if (oldVendor) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Number already in use",
        },
        { status: 400 },
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate unique email
    function generateRandomHex() {
      let hex = "";
      for (let i = 0; i < 6; i++) {
        hex += Math.floor(Math.random() * 16).toString(16);
      }
      return hex;
    }
    const randomNumber = generateRandomHex();
    const email = `example${randomNumber}@gmail.com`;

    // Create vendor data
    const vendorData = {
      vendorName: name,
      phone,
      password: hashPassword,
      email,
    };

    // Save vendor to database
    const vendor = new Vendor(vendorData);
    await vendor.save();

    // Send response
    return NextResponse.json(
      {
        status: "success",
        message: "Vendor created successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message,
        error,
      },
      { status: 400 },
    );
  }
}

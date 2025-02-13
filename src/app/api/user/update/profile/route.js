import connectMongoDb from "@/lib/mongoose";
import User from "@/models/userModel";

import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { name, email, phone, dateOfBirth, gender, nid, address, photo } =
      await req.json(); // Parse request body

    // Validate if required fields are provided
    if ( !phone) {
      return NextResponse.json(
        { status: "fail", message: "phone is required" },
        { status: 400 },
      );
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        {
          status: "fail",
          message: "No user found with the provided phone number",
        },
        { status: 400 },
      );
    }

    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.nid = nid || user.nid;
    user.address = address || user.address;
    user.photo = photo || user.photo;

    // Save the updated user data
    const updatedUser = await user.save();

    return NextResponse.json(
      {
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 400 },
    );
  }
}

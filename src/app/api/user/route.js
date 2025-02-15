import connectMongoDb from "@/lib/mongoose";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// GET USER BY ID
export async function GET(req) {
  try {
    await connectMongoDb();
    
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { status: "fail", message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}

// UPDATE USER BY ID
export async function PUT(req) {
  try {
    await connectMongoDb();
    
    const userId = req.nextUrl.searchParams.get("userId"); // Get user ID from URL query params
    const { name, email, dateOfBirth, gender, nid, address, photo, phone } = await req.json(); // Parse request body

    if (!userId) {
      return NextResponse.json(
        { status: "fail", message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    // Update user data if provided
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;
    user.gender = gender ?? user.gender;
    user.nid = nid ?? user.nid;
    user.address = address ?? user.address;
    user.photo = photo ?? user.photo;
    user.phone = phone ?? user.phone;

    // Save updated user
    await user.save();

    return NextResponse.json(
      {
        status: "success",
        message: "User updated successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}

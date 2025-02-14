import connectMongoDb from "@/lib/mongoose";
import User from "@/models/userModel";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    // Find user by phone
    const users = await User.find({ role: "user" });

    return NextResponse.json(
      {
        status: "success",
        message: "User updated successfully",
        data: users,
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

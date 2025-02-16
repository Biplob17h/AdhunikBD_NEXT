import connectMongoDb from "@/lib/mongoose";
import User from "@/models/userModel";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const name = new URL(req.url).searchParams.get("name");
    const phone = new URL(req.url).searchParams.get("phone");

    let query = {
      role: "user",
    };

    // Use $regex with the 'i' flag for case-insensitive search on name
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    if (phone) {
      query.phone = phone;
    }

    // Find user by phone
    const users = await User.find(query);

    return NextResponse.json(
      {
        status: "success",
        message: "User found successfully",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 400 }
    );
  }
}

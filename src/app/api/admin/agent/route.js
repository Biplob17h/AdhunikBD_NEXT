import connectMongoDb from "@/lib/mongoose";
import User from "@/models/userModel";

import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { userId } = await req.json();

    // Find user by phone
    const user = await User.findById(userId);

    if (!user) {
      // Return error response
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 },
      );
    }

    // Update user details
    user.role = "agent";

    await user.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Agent assign successfully",
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
export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const name = new URL(req.url).searchParams.get("name");
    const phone = new URL(req.url).searchParams.get("phone");

    let query = {
      role: "agent",
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

export async function PATCH(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { agentId } = await req.json(); // ✅ Corrected the JSON parsing
    if (!agentId) throw new Error("Agent ID is required");

    // Find agent by ID
    const agent = await User.findById(agentId);
    if (!agent) throw new Error("Agent not found");

    return NextResponse.json(
      {
        status: "success",
        message: "Agent found successfully",
        data: agent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 400 }
    );
  }
}


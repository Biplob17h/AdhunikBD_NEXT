import connectMongoDb from "@/lib/mongoose";
import User from "@/models/userModel";
import { generateToken } from "@/utils/auth/generateToken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "No user found" },
        { status: 400 },
      );
    }

    // Check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        { status: "fail", message: "Wrong password" },
        { status: 400 },
      );
    }

    // Generate token
    const token = generateToken(user._id);

    // Select user data (excluding password)
    const userData = await User.findOne({ phone }).select([
      "-password",
      "-_id",
    ]);

    // Send success response
    return NextResponse.json(
      {
        status: "success",
        message: "User signed in successfully",
        data: { userData, token },
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

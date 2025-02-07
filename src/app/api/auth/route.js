import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import connectMongoDb from "@/lib/mongoose";

export async function GET(req) {
  try {
    await connectMongoDb();

    // Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { status: "fail", error: "Authentication error. Please log in again." },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (!decoded?.userId) {
      return NextResponse.json(
        { status: "fail", error: "Invalid token. Please log in again." },
        { status: 401 },
      );
    }

    // Find user by ID (token stores userId)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json(
        { status: "fail", error: "User not found. Please log in again." },
        { status: 401 },
      );
    }

    // Return user if authenticated
    return NextResponse.json({ status: "success", user });
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        error: "Invalid or expired token. Please log in again.",
      },
      { status: 401 },
    );
  }
}

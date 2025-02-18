import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import Vendor from "@/models/vendorModel"; // Import Vendor model
import connectMongoDb from "@/lib/mongoose";
import bcrypt from "bcryptjs";

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

    if (!decoded?.userId?.userId || !decoded?.userId?.userRole) {
      return NextResponse.json(
        { status: "fail", error: "Invalid token. Please log in again." },
        { status: 401 },
      );
    }

    const { userId, userRole } = decoded.userId; // Extract values correctly

    let user;
    if (userRole === "user" || userRole === "admin" || userRole === "agent") {
      user = await User.findById(userId).select("-password");
    } else if (userRole === "vendor") {
      user = await Vendor.findById(userId).select("-password");
    }

    if (!user) {
      return NextResponse.json(
        { status: "fail", error: "User not found. Please log in again." },
        { status: 401 },
      );
    }

    // Return authenticated user/vendor
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

export async function PUT(req) {
  try {
    await connectMongoDb();

    const { oldPassword, newPassword, _id } = await req.json();

    const user = await User.findOne({ _id });

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found." },
        { status: 404 },
      );
    }

    const password = user?.password;

    const isMatch = await bcrypt.compare(oldPassword, password);
    if (!isMatch) {
      return NextResponse.json(
        { status: "fail", message: "Old password is incorrect." },
        { status: 400 },
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashPassword;
    await user.save();

    // Return authenticated user/vendor
    return NextResponse.json({
      status: "success",
      message: "User Password Updated Successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Invalid or expired token. Please log in again.",
      },
      { status: 401 },
    );
  }
}

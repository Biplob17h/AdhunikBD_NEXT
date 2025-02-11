import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import Vendor from "@/models/vendorModel"; // Import Vendor model
import connectMongoDb from "@/lib/mongoose";

export async function GET(req) {
  try {
    await connectMongoDb();

    // Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { status: "fail", error: "Authentication error. Please log in again." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    

    if (!decoded?.userId?.userId || !decoded?.userId?.userRole) {
      return NextResponse.json(
        { status: "fail", error: "Invalid token. Please log in again." },
        { status: 401 }
      );
    }

    const { userId, userRole } = decoded.userId; // Extract values correctly

    let user;
    if (userRole === "user" || userRole === "admin") {
      user = await User.findById(userId).select("-password");
    } else if (userRole === "vendor") {
      user = await Vendor.findById(userId).select("-password");
    }

    if (!user) {
      return NextResponse.json(
        { status: "fail", error: "User not found. Please log in again." },
        { status: 401 }
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
      { status: 401 }
    );
  }
}

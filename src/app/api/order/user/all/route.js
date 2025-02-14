import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderSchema";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    // Correctly extract userId from query parameters
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide a userId" },
        { status: 400 }
      );
    }

    // Optionally validate MongoDB ObjectId if userId is stored as an ObjectId in MongoDB
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid userId" },
        { status: 400 }
      );
    }

    // Fetch orders for the given userId and populate fields correctly
    const orders = await Order.find({ user: userId }).populate([
      "service",
      "user",
      "subCategoryId" 
    ]);

    return NextResponse.json(
      {
        status: "success",
        message: "User orders found successfully",
        data: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 }
    );
  }
}

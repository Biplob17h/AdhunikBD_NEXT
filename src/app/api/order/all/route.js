import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderSchema";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    // Fetch orders for the given userId and populate fields correctly
    const orders = await Order.find({})

    return NextResponse.json(
      {
        status: "success",
        message: "User orders found successfully",
        data: orders,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

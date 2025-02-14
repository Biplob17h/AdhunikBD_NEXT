import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderSchema";
import Service from "@/models/serviceModel";
import User from "@/models/userModel";
import SubCategory from "@/models/subCategoryModel";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide a userId" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid userId" },
        { status: 400 }
      );
    }

    // Fetch orders for the given userId with explicit model references
    const orders = await Order.find({ user: userId })
      .populate({ path: "service", model: Service })
      .populate({ path: "user", model: User })
      .populate({ path: "subCategoryId", model: SubCategory })
      .exec();

    return NextResponse.json(
      {
        status: "success",
        message: "User orders found successfully",
        data: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 }
    );
  }
}

import connectMongoDb from "@/lib/mongoose";
import Coupon from "@/models/couponModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      await connectMongoDb(); // Ensure MongoDB is connected
  
      const coupon = await Coupon.find({})
  
      return NextResponse.json(
        {
          status: "success",
          message: "Coupon found successfully",
          data: coupon,
        },
        { status: 200 } // 201 for resource creation
      );
    } catch (error) {
      console.error("Error saving coupon:", error);
      return NextResponse.json(
        { status: "fail", message: "Internal server error" },
        { status: 500 }
      );
    }
  }
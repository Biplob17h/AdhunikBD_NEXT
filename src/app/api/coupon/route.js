import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Coupon from "@/models/couponModel";
import connectMongoDb from "@/lib/mongoose";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const body = await req.json(); // Parse request body safely
    const { code, type, value, expirationDate } = body;

    if (!code || !type || !value || !expirationDate) {
      return NextResponse.json(
        { status: "fail", message: "All fields are required" },
        { status: 400 },
      );
    }

    const coupon = new Coupon({ code, type, value, expirationDate });

    await coupon.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Coupon created successfully",
        data: coupon,
      },
      { status: 201 }, // 201 for resource creation
    );
  } catch (error) {
    console.error("Error saving coupon:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const couponId = req.nextUrl.searchParams.get("couponId");

    if (!couponId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide a couponId" },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid couponId" },
        { status: 400 },
      );
    }

    // Fetch coupon for the given couponId with explicit model references
    const coupon = await Coupon.findById(couponId);

    return NextResponse.json(
      {
        status: "success",
        message: "coupon found successfully",
        data: orders,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { couponId, code, type, value, expirationDate } = await req.json();

    if (!couponId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide a couponId" },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid couponId" },
        { status: 400 },
      );
    }

    // Fetch coupon for the given couponId
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return NextResponse.json(
        { status: "fail", message: "Coupon not found" },
        { status: 404 },
      );
    }

    coupon.code = code;
    coupon.type = type;
    coupon.value = value;
    coupon.expirationDate = expirationDate;

    await coupon.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Coupon updated successfully",
        data: coupon, // Return the updated coupon
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const couponId = req.nextUrl.searchParams.get("couponId");

    if (!couponId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide a couponId" },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid couponId" },
        { status: 400 },
      );
    }

    const coupon = await Coupon.findByIdAndDelete(couponId);
    if (!coupon) {
      return NextResponse.json(
        { status: "fail", message: "Coupon not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Coupon deleted successfully",
        data: coupon, // Return the deleted coupon
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

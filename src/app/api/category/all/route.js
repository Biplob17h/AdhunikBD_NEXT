import connectMongoDb from "@/lib/mongoose";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    // const categoryId = req.nextUrl.searchParams.get("categoryId");

    const result = await Category.find({});

    return NextResponse.json(
      {
        status: "success",
        data: result,
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

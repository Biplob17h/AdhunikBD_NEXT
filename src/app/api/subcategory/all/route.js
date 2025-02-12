import connectMongoDb from "@/lib/mongoose";
import SubCategory from "@/models/subCategoryModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    // const categoryId = req.nextUrl.searchParams.get("categoryId");

    const result = await SubCategory.find({});

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

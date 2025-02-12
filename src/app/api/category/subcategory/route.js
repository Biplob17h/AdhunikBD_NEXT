import connectMongoDb from "@/lib/mongoose";
import SubCategory from "@/models/subCategoryModel";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const categoryId = req.nextUrl.searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { status: "fail", message: "categoryId is required" },
        { status: 400 },
      );
    }

    const result = await SubCategory.find({ categoryId: categoryId });

    if (!result) {
      return NextResponse.json(
        { status: "fail", message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 },
    );
  }
}
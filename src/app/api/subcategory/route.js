import connectMongoDb from "@/lib/mongoose";
import SubCategory from "@/models/subCategoryModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { name, photoUrl, categoryId } = await req.json(); // Parse request body

    // Validate if required fields are provided
    if (!name || !photoUrl || !categoryId) {
      return NextResponse.json(
        { status: "fail", message: "please provide your info correctly" },
        { status: 400 },
      );
    }

    const subCategory = await SubCategory({
      subCategory: name,
      photo: photoUrl,
      categoryId
    });

    await subCategory.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Sub category created successfully",
        data: subCategory,
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

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const subCategoryId = req.nextUrl.searchParams.get("subCategoryId");

    if (!subCategoryId) {
      return NextResponse.json(
        { status: "fail", message: "subCategoryId is required" },
        { status: 400 },
      );
    }

    const result = await SubCategory.findOne({ _id: subCategoryId });

    if (!result) {
      return NextResponse.json(
        { status: "fail", message: "Sub categoryId not found" },
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

export async function PUT(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { subCategoryId, name, photo } = await req.json(); // Parse request body

    if (!subCategoryId || !name || !photo) {
      return NextResponse.json(
        { status: "fail", message: "All fields are required" },
        { status: 400 },
      );
    }

    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return NextResponse.json(
        { status: "fail", message: "Category not found" },
        { status: 404 },
      );
    }

    // Update category details
    subCategory.subCategory = name;
    subCategory.photo = photo;

    await subCategory.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Category updated successfully",
        data: category,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating category:", error); // Log the actual error
    return NextResponse.json(
      { status: "fail", message: "Something went wrong. Try again!" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const subCategoryId = req.nextUrl.searchParams.get("subCategoryId");

    const result = await SubCategory.deleteOne({ _id: subCategoryId });

    return NextResponse.json(
      {
        status: "success",
        message: "Sub category Deleted successfully",
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

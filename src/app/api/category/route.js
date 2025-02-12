import connectMongoDb from "@/lib/mongoose";
import Category from "@/models/categoryModel";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { categoryName, photoUrl } = await req.json(); // Parse request body

    // Validate if required fields are provided
    if (!categoryName || !photoUrl) {
      return NextResponse.json(
        { status: "fail", message: "Category name and Photo are required" },
        { status: 400 },
      );
    }

    const category = await Category({
      category: categoryName,
      photo: photoUrl,
    });

    await category.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Category created successfully",
        data: category,
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

    const categoryId = req.nextUrl.searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { status: "fail", message: "categoryId is required" },
        { status: 400 },
      );
    }

    const result = await Category.findOne({ _id: categoryId });

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

export async function PUT(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { categoryId, name, photoUrl } = await req.json(); // Parse request body

    const category = await Category.findOne({ _id: categoryId });

    category.category = name;
    category.photo = photoUrl;

    await category.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Category updated successfully",
        data: category,
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
export async function DELETE(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const categoryId = req.nextUrl.searchParams.get("categoryId");

    const result = await Category.deleteOne({ _id: categoryId });

    return NextResponse.json(
      {
        status: "success",
        message: "Category Deleted successfully",
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

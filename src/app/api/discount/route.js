import { NextResponse } from "next/server";
import mongoose from "mongoose";
import SubCategory from "@/models/subCategoryModel";
import connectMongoDb from "@/lib/mongoose";
import genId from "@/utils/genId/genId";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { type, discount, subCategoryId, startAt, endAt } = await req.json();

    // Fetch subcategory
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return NextResponse.json(
        { status: "fail", message: "SubCategory not found" },
        { status: 404 },
      );
    }

    const id = genId();

    const discountData = {
      _id: id,
      type,
      discount,
    };

    subCategory.discount.push(discountData);
    await subCategory.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Discount created successfully",
        data: discountData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating discount:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb();

    const { _id, subCategoryId } = await req.json();

    if (!subCategoryId || !_id) {
      return NextResponse.json(
        { status: "fail", message: "subCategoryId and id are required" },
        { status: 400 },
      );
    }

    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return NextResponse.json(
        { status: "fail", message: "SubCategory not found" },
        { status: 404 },
      );
    }

    // Remove discount by `_id`
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { $pull: { discount: { _id: _id } } },
      { new: true },
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Discount deleted successfully",
        data: updatedSubCategory,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

import connectMongoDb from "@/lib/mongoose";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import for ObjectId validation

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const subCategoryId = new URL(req.url).searchParams.get("subCategoryId");

    // Validate subCategoryId
    if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid or missing subCategoryId" },
        { status: 400 }
      );
    }

    // Fetch services for the given subCategoryId
    const services = await Service.find({ subCategoryId });

    return NextResponse.json(
      {
        status: "success",
        data: services,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching services:", error); // Log the error
    return NextResponse.json(
      { status: "fail", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



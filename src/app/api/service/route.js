import connectMongoDb from "@/lib/mongoose";
import Service from "@/models/serviceModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { name, price, categoryId, subCategoryId } = await req.json(); // Parse request body

    // Validate if required fields are provided
    if (!name || !price || !categoryId || !subCategoryId) {
      return NextResponse.json(
        { status: "fail", message: "please provide your info correctly" },
        { status: 400 },
      );
    }

    const service = await Service({
      name,
      price,
      categoryId,
      subCategoryId,
    });

    await service.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Sub category created successfully",
        data: service,
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

    const serviceId = await req.nextUrl.searchParams.get("serviceId");

    if (!serviceId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide a serviceId" },
        { status: 400 },
      );
    }

    const service = await Service.findById({ _id: serviceId }).populate(['categoryId', "subCategoryId"])

    return NextResponse.json(
      {
        status: "success",
        message: "Sub category created successfully",
        data: service,
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

export async function PUT(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { serviceId, name, price } = await req.json(); // Parse request body

    // Validate inputs
    if (!serviceId || !name || !price) {
      return NextResponse.json(
        { status: "fail", message: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid serviceId" },
        { status: 400 },
      );
    }

    // Find and update the service
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { name, price },
      { new: true }, // Return the updated document
    );

    if (!updatedService) {
      return NextResponse.json(
        { status: "fail", message: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Service updated successfully",
        data: updatedService,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating service:", error); // Log the actual error
    return NextResponse.json(
      { status: "fail", message: "Something went wrong. Try again!" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const serviceId = await req.nextUrl.searchParams.get("serviceId");

    const result = await Service.deleteOne({ _id: serviceId });

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

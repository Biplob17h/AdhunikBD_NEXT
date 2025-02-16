import connectMongoDb from "@/lib/mongoose";
import Location from "@/models/locationModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { location } = await req.json(); // Parse request body

    const locationData = await Location({
      location,
    });

    await locationData.save();

    return NextResponse.json(
      {
        status: "success",
        message: "location created successfully",
        data: locationData,
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

    const locationId = req.nextUrl.searchParams.get("locationId");

    if (!locationId) {
      return NextResponse.json(
        { status: "fail", message: "locationId is required" },
        { status: 400 },
      );
    }

    const result = await Location.findOne({ _id: locationId });

    if (!result) {
      return NextResponse.json(
        { status: "fail", message: "Location not found" },
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

    const { locationId, location } = await req.json(); // Parse request body

    

    const locationData = await Location.findById(locationId);
    if (!locationData) {
      return NextResponse.json(
        { status: "fail", message: "Category not found" },
        { status: 404 },
      );
    }

    // Update category details
    locationData.location = location;

    await locationData.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Location Data updated successfully",
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

    const locationId = req.nextUrl.searchParams.get("locationId");

    const result = await Location.deleteOne({ _id: locationId });

    return NextResponse.json(
      {
        status: "success",
        message: "Location Deleted successfully",
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

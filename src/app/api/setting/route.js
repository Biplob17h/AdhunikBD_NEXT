import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDb from "@/lib/mongoose";
import Settings from "@/models/settingsModel";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const settings = await Settings.findOne({});
    return NextResponse.json(
      {
        status: "success",
        message: "settings found successfully",
        data: settings,
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

// PUT request to update settings
export async function PUT(req) {
  try {
    await connectMongoDb();
    const body = await req.json();

    if (!body._id) {
      return NextResponse.json(
        { error: "Invalid request, missing _id" },
        { status: 400 },
      );
    }

    const updatedSettings = await Settings.findByIdAndUpdate(
      body._id,
      { $set: { home: body.home } },
      { new: true },
    );

    if (!updatedSettings) {
      return NextResponse.json(
        { error: "Settings not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}

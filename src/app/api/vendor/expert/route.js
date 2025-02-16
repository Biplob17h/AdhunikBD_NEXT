import Expert from "@/models/expertModel";
import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";


// CREATE AN EXPRT
export async function POST(req) {
  await connectMongoDb();

  try {

    const { name, phone, photo, nid, verify } =await req.json();

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json({
        status: "Fail",
        message: "Name and Phone are required.",
      });
    }

    // Create a new expert
    const newExpert = new Expert({
      name,
      phone,
      photo,
      nid,
      verify,
    });

    const savedExpert = await newExpert.save();

    return NextResponse.json({
      status: "Success",
      data: savedExpert,
    });
  } catch (error) {
    console.error("Error creating expert:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "Failed to create expert",
    });
  }
}


// GET ALL & SINGLE EXPERT
export async function GET(req) {
  try {
    // Connect to the database
    await connectMongoDb();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch a single expert by ID
      const expert = await Expert.findById(id);

      if (!expert) {
        return NextResponse.json({
          status: "Fail",
          message: "Expert not found.",
        }, { status: 404 });
      }

      return NextResponse.json({
        status: "Success",
        data: expert,
      });
    } else {
      // Fetch all experts
      const experts = await Expert.find({});
      return NextResponse.json({
        status: "Success",
        data: experts,
      });
    }
  } catch (error) {
    console.error("Error fetching experts:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "Failed to fetch experts",
    }, { status: 500 });
  }
}


// EDIT SINGLE EXPERT
export async function PUT(req) {
  await connectMongoDb();

  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Validate the ID
    if (!id) {
      return NextResponse.json({
        status: "Fail",
        message: "Expert ID is required.",
      }, { status: 400 });
    }

    // Parse the request body
    const body = await req.json();
    const { name, phone, photo, nid, verify } = body;

    // Validate at least one field is provided for update
    if (!name && !phone && !photo && !nid && !verify) {
      return NextResponse.json({
        status: "Fail",
        message: "At least one field (name, phone, photo, nid, verify) is required for update.",
      }, { status: 400 });
    }

    // Find the expert by ID and update the provided fields
    const updatedExpert = await Expert.findByIdAndUpdate(
      id,
      { name, phone, photo, nid, verify },
      { new: true, runValidators: true } 
    );

    // Check if the expert exists
    if (!updatedExpert) {
      return NextResponse.json({
        status: "Fail",
        message: "Expert not found.",
      }, { status: 404 });
    }

    // Return the updated expert
    return NextResponse.json({
      status: "Success",
      data: updatedExpert,
    });
  } catch (error) {
    console.error("Error updating expert:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "Failed to update expert",
    }, { status: 500 });
  }
}
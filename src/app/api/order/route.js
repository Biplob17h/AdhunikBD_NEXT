import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/orderSchema";
import Service from "@/models/serviceModel";
import User from "@/models/userModel";
import SubCategory from "@/models/subCategoryModel";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const order = await req.json(); // Parse request body

    const orderData = await Order(order);

    await orderData.save();
    return NextResponse.json(
      {
        status: "success",
        message: "Order created successfully",
        data: orderData,
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

    const orderId = req.nextUrl.searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide an orderId" },
        { status: 400 },
      );
    }

    // Validate if orderId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid orderId format" },
        { status: 400 },
      );
    }

    // Fetch the order with populated fields
    const order = await Order.findById(orderId)
      .populate({ path: "service", model: Service }) // Use explicit model reference
      .populate({ path: "user", model: User })
      .populate({ path: "subCategoryId", model: SubCategory })
      .exec();

    if (!order) {
      return NextResponse.json(
        { status: "fail", message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Order received successfully",
        data: order,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
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

// Accept or reject the request
export async function PATCH(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const { orderId, action } = await req.json(); // Parse request body

    if (!orderId) {
      return NextResponse.json(
        { status: "fail", message: "Please provide an orderId" },
        { status: 400 },
      );
    }

    // Validate if orderId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid orderId format" },
        { status: 400 },
      );
    }

    // Fetch the order with populated fields
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { status: "fail", message: "Order not found" },
        { status: 404 },
      );
    }

    if (action === "accept") {
      order.status = "accepted";
    } else if (action === "reject") {
      order.status = "rejected";
    }

    await order.save();

    return NextResponse.json(
      {
        status: "success",
        message: "order updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating order:", error); // Log the actual error
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

import connectMongoDb from "@/lib/mongoose";
import Report from "@/models/reportModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectMongoDb();
  
      const body = await req.json();
      
  
      const { title, description, orderId, userId } = body;
  
      if (!title || !description || !orderId || !userId) {
        return NextResponse.json(
          { status: "fail", message: "Please provide all required fields" },
          { status: 400 }
        );
      }
  
      if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { status: "fail", message: "Invalid orderId or userId format" },
          { status: 400 }
        );
      }
  
      const report = new Report({ title, description, orderId, userId });
      await report.save();
  
      return NextResponse.json(
        { status: "success", message: "Report created successfully", data: report },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating report:", error);
      return NextResponse.json(
        { status: "fail", message: "Internal server error" },
        { status: 500 }
      );
    }
  }
  



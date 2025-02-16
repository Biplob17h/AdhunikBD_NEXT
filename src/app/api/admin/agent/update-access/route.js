import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectMongoDb from "@/lib/mongoose";

export async function PATCH(req) {
  try {
    await connectMongoDb();
    const { agentId, access } = await req.json();

    const agent = await User.findByIdAndUpdate(agentId, { access }, { new: true });

    if (!agent) throw new Error("Agent not found");

    return NextResponse.json(
      { status: "success", message: "Access updated", data: agent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 400 }
    );
  }
}

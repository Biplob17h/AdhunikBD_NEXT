import connectMongoDb from "@/lib/mongoose";
import Coupon from "@/models/couponModel";

export async function GET(req) {
  try {
    await connectMongoDb(); // Ensure MongoDB is connected

    const code = req.nextUrl.searchParams.get("code");

    // Fetch coupon for the given couponId with explicit model references
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return NextResponse.json(
        { status: "fail", message: "Coupon not found" },
        { status: 404 },
      );
    }

    const today = new Date();
    const expirationDate = coupon.expirationDate;

    if (today > expirationDate) {
      return NextResponse.json(
        { status: "fail", message: "Coupon has expired" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "coupon found successfully",
        data: orders,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 },
    );
  }
}

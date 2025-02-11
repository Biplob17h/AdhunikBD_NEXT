import connectMongoDb from "@/lib/mongoose";
import Vendor from "@/models/vendorModel";


export async function PUT(req) {
    try {
      await connectMongoDb();
  
      const { oldPassword, newPassword, _id } = await req.json();
  
      const vendor = await Vendor.findOne({ _id });
  
      if (!vendor) {
        return NextResponse.json(
          { status: "fail", message: "vendor not found." },
          { status: 404 },
        );
      }
  
      const password = user?.password;
  
      const isMatch = await bcrypt.compare(oldPassword, password);
      if (!isMatch) {
        return NextResponse.json(
          { status: "fail", message: "Old password is incorrect." },
          { status: 400 },
        );
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
  
      // Update password
      vendor.password = hashPassword;
      await vendor.save();
  
      // Return authenticated vendor
      return NextResponse.json({
        status: "success",
        message: "Vendor Password Updated Successfully",
        vendor,
      });
    } catch (error) {
      return NextResponse.json(
        {
          status: "fail",
          error: "Invalid or expired token. Please log in again.",
        },
        { status: 401 },
      );
    }
  }
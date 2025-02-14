import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["new", "in progress", "completed", "rejected"],
    default: "new",
  },
});

const Report =
  mongoose.models.Reports || mongoose.model("Reports", reportSchema);

export default Report;

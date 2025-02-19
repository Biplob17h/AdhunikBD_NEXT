// models/Expert.js
import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, "name is too short"],
    maxLength: [50, "name is too long"],
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  nid: {
    type: String,
    default: "",
  },
  verify: {
    type: String,
    enum: ["Verify", "Not Verify"],
    default: "Not Verify",
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Vendor model
    ref: "vendors", // Reference to the Vendor collection
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Expert = mongoose.models.experts || mongoose.model("experts", expertSchema);

export default Expert;
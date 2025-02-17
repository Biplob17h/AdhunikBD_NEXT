// models/Vendor.js
import mongoose from "mongoose";
import validator from "validator";

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "name is too short"],
    maxLength: [50, "name is too long"],
  },
  shopName: {
    type: String,
    trim: true,
    maxLength: [50, "name is too long"],
  },
  shopAddress: {
    type: String,
    trim: true,
    maxLength: [50, "name is too long"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isMobilePhone,
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email address!`,
    },
    default: "example@gmail.com",
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password is too short"],
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "vendor",
  },
  vendorPhoto: {
    type: String,
    default: "",
  },
  shopPhoto: {
    type: Array,
    default: [],
  },
  experts: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Expert model
      ref: "experts", // Reference to the Expert collection
    },
  ],
  nid: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "pending", "blocked", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approveAt: {
    type: Date,
    default: "",
  },
  service: [
    {
      serviceName: {
        type: String,
      },
    },
  ],
  location: [
    {
      location: {
        type: String,
      },
    },
  ],
  showUpdateWarning: {
    type: Boolean,
    default: true,
  },
});

const Vendor =
  mongoose.models?.vendors || mongoose.model("vendors", vendorSchema);

export default Vendor;
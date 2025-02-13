import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategories",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
      default: null,
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
      default: null,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tickets",
      default: null,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    road: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "new",
      enum: [
        "new",
        "assigned",
        "rejected",
        "accepted",
        "served",
        "completed",
        "cancelled",
      ],
    },
    coupon: {
      type: String,
      default: "working on it, this function will be at later",
    },
    vendorParseint: {
      type: Number,
      default: 20,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { strictPopulate: false } // Disable strict population here
);

const Order = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Order;

import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategory: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  discount: [
    {
      type: {
        type: String,
        enum: ["percentage", "amount"],
        default: "percentage",
      },
      discount: {
        type: Number,
        default: 0,
      },
      startAt: {
        type: Date,
        default: Date.now(),
      },
      endAt: {
        type: Date,
        default: null,
      },
    },
  ],
});

const SubCategory =
  mongoose.models.subCategories ||
  mongoose.model("subCategories", subCategorySchema);

export default SubCategory;

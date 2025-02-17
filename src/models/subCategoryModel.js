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
  discount: {
    type: Array,
    default: [],
  },
});

const SubCategory =
  mongoose.models.subCategories ||
  mongoose.model("subCategories", subCategorySchema);

export default SubCategory;

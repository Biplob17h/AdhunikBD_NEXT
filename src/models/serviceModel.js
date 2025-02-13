import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategories",
  },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;

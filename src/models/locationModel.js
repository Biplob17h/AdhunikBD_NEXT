import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  areas: [
    {
      area: {
        type: String,
      },
    },
  ],
});

const Location =
  mongoose.models.locations || mongoose.model("locations", locationSchema);

export default Location;

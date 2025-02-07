import mongoose from "mongoose";
import colors from "colors";

// Connect to MongoDB

const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log("mongodb connected".bgCyan.bold);
  } catch (error) {
    console.error(`Failed to connect to MongoDB`.bgRed.bold);
  }
};

export default connectMongoDb;

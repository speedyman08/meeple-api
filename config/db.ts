import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("DB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
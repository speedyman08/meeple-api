import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/database');
    console.log("DB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
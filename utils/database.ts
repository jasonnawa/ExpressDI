import mongoose from "mongoose";
import dotenv from "dotenv"
import process from "process"
import EnvConfiguration from "./env-config";
import { container } from "tsyringe";

dotenv.config()


export const connectToDatabase = async () => {
  try {
    const envConfig = container.resolve<EnvConfiguration>(EnvConfiguration)
    await mongoose.connect(envConfig.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB successfully");
  } catch (error) {
    console.log("MongoDB disconnection error:", error);
    throw error;
  }
};

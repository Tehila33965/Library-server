import mongoose from "mongoose";
import dns from "dns";
import { env } from "./env.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        console.log('URI being used:', process.env.MONGO_URI);
        await connect(process.env.MONGO_URI);
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
};

//connectDB();
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error(`Error Connectring to DB : ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      dbName: process.env.Imad_db,
    });
    console.log("Connection to DB established!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // process.exit(1); // Beende den Prozess, wenn eine Verbindung zur DB fehlschlägt
  }
};

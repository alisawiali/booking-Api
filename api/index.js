import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { connectDb } from "./service/db.js";
const app = express();
//Middelwaers
app.use(express.json());
dotenv.config();

// coonect with db
await connectDb();

//  PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`😊 Server running on http://localhost:${PORT}/`);
});

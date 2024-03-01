import dotenv from "dotenv";
import express from "express";
//  import db aus dem db.js
import { connectDb } from "./service/db.js";
//  import 
import authRouter from "./src/router/auth.js";
import hotelsRouter from "./src/router/hotels.js";
import userRouter from "./src/router/user.js";
import roomsRouter from "./src/router/rooms.js";




// 
const app = express();
//  Middelwaers
app.use(express.json());
dotenv.config();

// coonect with db
await connectDb();




//  PORT  and if this false got 3000
const PORT = process.env.PORT || 3000;


app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/user", userRouter);



app.listen(PORT, () => {
  console.log(`😊 Server running on http://localhost:${PORT}/`);
});

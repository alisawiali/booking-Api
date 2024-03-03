// Importiere dotenv zur Verwendung von Umgebungsvariablen
import dotenv from "dotenv";
// Importiere das Express-Framework
import express from "express";
// Importiere die Verbindung zur Datenbank aus der db.js-Datei
import { connectDb } from "./service/db.js";
// Importiere Router für verschiedene Endpunkte
import authRouter from "./src/router/auth.js";
import hotelsRouter from "./src/router/hotels.js";
import userRouter from "./src/router/user.js";
import roomsRouter from "./src/router/rooms.js";

// Initialisiere die Express-App
const app = express();

// Middleware für das Parsen von JSON-Anfragen
app.use(express.json());

// Konfiguriere Umgebungsvariablen mit dotenv
dotenv.config();

// Verbinde mit der Datenbank
await connectDb();

// Definiere den Port, auf dem der Server laufen soll
const PORT = process.env.PORT || 3000;

// // middlewear
// app.use((req, res, next) => {
//   console.log("hi i middlewear from server");
//   next();
// });
// Verwende die verschiedenen Router für verschiedene Endpunkte
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const errortatus = err.status || 500;
  const errorMessage = err.message || "Internal Error.";
  return res.status(errortatus).send(errorMessage);
});
// Starte den Server und lausche auf dem angegebenen Port
app.listen(PORT, () => {
  console.log(`😊 Server running on http://localhost:${PORT}/`);
});

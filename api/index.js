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
import roomRouter from "./src/router/rooms.js";

//  import  cookie-parser
import cookieParser from "cookie-parser";

// Initialisiere die Express-App
const app = express();

//
app.use(cookieParser());
// Middleware für das Parsen von JSON-Anfragen
app.use(express.json());

// Konfiguriere Umgebungsvariablen mit dotenv
dotenv.config();

// Verbinde mit der Datenbank
await connectDb();

// Definiere den Port, auf dem der Server laufen soll
const PORT = process.env.PORT || 3000;

// Verwende die verschiedenen Router für verschiedene Endpunkte
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/user", userRouter);


// Middleware zur Fehlerbehandlung
app.use((err, req, res, next) => {
  const errortatus = err.status || 500;
  const errorMessage = err.message || "Internal Error.";
    return res.status(errortatus).send({
      success: false,
      message: errorMessage,
      status: errortatus,
      stack: err.stack,
    });
});
// Starte den Server und lausche auf dem angegebenen Port
app.listen(PORT, () => {
  console.log(`😊 Server running on http://localhost:${PORT}/`);
});

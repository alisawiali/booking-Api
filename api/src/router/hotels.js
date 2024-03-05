import { Router } from "express";
import { createErrro } from "../utils/error.js";
import {
  createHotel,
  deletedHotel,
  getByIddHotel,
  getdHotels,
  puteHotel,
} from "../controller/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const hotelsRouter = Router();
// CAEATE  HOTEL
hotelsRouter.post("/", verifyAdmin, createHotel);
// UPDATE  HOTEEL
hotelsRouter.put("/:id", verifyAdmin, puteHotel);
// DELETE HOTEEL
hotelsRouter.delete("/:id", verifyAdmin, deletedHotel);
//  GET BY ID HOTEL
hotelsRouter.get("/:id", getByIddHotel);

// GET All HOTLES
hotelsRouter.get("/", getdHotels);



export default hotelsRouter;
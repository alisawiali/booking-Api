import { Router } from "express";
import { createErrro } from "../utils/error.js";
import {
  createHotel,
  deletedHotel,
  getByIddHotel,
  getdHotels,
  puteHotel,
} from "../controller/hotels.js";

const hotelsRouter = Router();
// CAEATE  HOTEL
hotelsRouter.post("/", createHotel);
// UPDATE  HOTEEL
hotelsRouter.put("/:id", puteHotel);
// DELETE HOTEEL
hotelsRouter.delete("/:id", deletedHotel);
//  GET BY ID HOTEL
hotelsRouter.get("/:id", getByIddHotel);

// GET All HOTLES
hotelsRouter.get("/", getdHotels);



export default hotelsRouter;
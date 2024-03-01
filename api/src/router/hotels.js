import { Router } from "express";
import Hotels from "../modals/Hotels.js";

const hotelsRouter = Router();
// CAEATE
hotelsRouter.post("/", async (req, res) => {
  const hotel = new Hotels(req.body);
  try {
    const savedHotel = await hotel.save();
    return res.status(200).json(savedHotel);
    // if (!savedHotel) return res.status(400).send("Failed to create Hotel");
  } catch (error) {
    res.status(500).send(error);
  }
});
// UPDATE
// DELETE
// GET
// GET ALL
export default hotelsRouter;

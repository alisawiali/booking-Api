import { Router } from "express";
import Hotels from "../modals/Hotels.js";
import { createErrro } from "../utils/error.js";

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
hotelsRouter.put("/:id", async (req, res) => {
  try {
    const updateHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updateHotel);
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
});
// DELETE
hotelsRouter.delete("/:id", async (req, res) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully deleted the hotel.");
  } catch (error) {
    res.status(400).send("Error deleting the hotel.", error);
  }
});
// GET by id
hotelsRouter.get("/", async (req, res, next) => {
  try {
    const findHotels = await Hotels.find();
    res.status(200).send(findHotels);
  } catch (error) {
    next(error);
  }
});

export default hotelsRouter;

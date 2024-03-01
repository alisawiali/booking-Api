import { Router } from "express";

const roomsRouter = Router();

roomsRouter.get("/", (req, res) => {
  res.send("room-list");
});

export default roomsRouter;

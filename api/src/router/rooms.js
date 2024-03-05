import { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controller/rooms.js";

const roomRouter = Router();

roomRouter.post("/", verifyAdmin, createRoom);
roomRouter.put("/:id", verifyAdmin, updateRoom);
roomRouter.delete("/:id", verifyAdmin, deleteRoom);
roomRouter.get("/:id", getRoom);
roomRouter.get("/", getRooms);

export default roomRouter;

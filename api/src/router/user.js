import { Router } from "express";
import {
  updateUser,
  deletedUser,
  getByIdUser,
  getUsers,
} from "../controller/user.js";

const userRouter = Router();
// CREATE USER
userRouter.put("/", updateUser);
// UPDATE
userRouter.delete("/:id", deletedUser);
//  GET BY ID
userRouter.get("/:id", getByIdUser);
//  GET USERS
userRouter.get("/", getUsers);
export default userRouter;

import { Router } from "express";
import {
  creatUser,
  deletedUser,
  getByIddUser,
  getdUsers,
} from "../controller/user.js";

const userRouter = Router();
// CREATE USER
userRouter.post("/", creatUser);
// UPDATE
userRouter.put("/:id", deletedUser);
//  GET BY ID
userRouter.get("/:id", getByIddUser);
//  GET USERS
userRouter.get("/", getdUsers);
export default userRouter;

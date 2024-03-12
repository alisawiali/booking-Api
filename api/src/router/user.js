import { Router } from "express";
import {
  updateUser,
  deletedUser,
  getByIdUser,
  getUsers,
} from "../controller/user.js";

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const userRouter = Router();

// UPDATE USER
userRouter.put("/", verifyUser, updateUser);
// DELETE
userRouter.delete("/:id", verifyUser, deletedUser);
//  GET BY ID
userRouter.get("/:id", verifyUser, getByIdUser);
//  GET USERS
userRouter.get("/", verifyAdmin, getUsers);
export default userRouter;

import { Router } from "express";
import {
  updateUser,
  deletedUser,
  getByIdUser,
  getUsers,
} from "../controller/user.js";

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const userRouter = Router();
userRouter.get("/chackAuthentication", verifyToken, (req, res, next) => {
  res.send("hallo user, You are loggend in now");
});

userRouter.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hallo user, You are loggend in and now cann delete your account");
});

userRouter.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hallo Admin, You are logged now und you can delete all accounts");
});

// UPDATE USER
userRouter.put("/", updateUser);
// DELETE
userRouter.delete("/:id", deletedUser);
//  GET BY ID
userRouter.get("/:id", getByIdUser);
//  GET USERS
userRouter.get("/", getUsers);
export default userRouter;

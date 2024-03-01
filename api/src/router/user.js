import { Router } from "express";

const userRouter = Router();
userRouter.get("/", (req, res) => {
  res.send("hallo Imad");
});

export default userRouter;

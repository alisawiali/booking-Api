import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.json("Hallo Authent");
});

export default authRouter;

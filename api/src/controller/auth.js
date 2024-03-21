import User from "../modals/User.js";
//  import bcrypt aus dem bcrptjs Bibliothek von Node.js
import bcrypt from "bcryptjs";
//  import JWT from "jsonwebtoken"
import  jwt  from "jsonwebtoken";

//  Fehlerbehandlung ======>
import { createErrro } from "../utils/error.js";

//  Register ======>
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      // username: req.body.username,
      // email: req.body.email,   ----------------> Oder , dh es nimmt alles was man neues rein schreibt.
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user has been created");
  } catch (error) {
    // Überprüfen, ob der Fehlercode auf einen Duplikatfehler hinweist
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Benutzername bereits vorhanden",
      });
    }
    next(error);
  }
};

//  Login ======>  compare  يقارن
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createErrro(404, "user not found!"));
    // bcrypt.compare
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createErrro(400, "Password incorrect or username!"));
    //  Token Prüfw stelle der password ist korrekt (2)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    //  name ausgedacht  ==> otherDetails (3)
    const { password, isAdmin, ...otherDetails } = user._doc;
    // Token abschickt
    res
      .cookie("accesse_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
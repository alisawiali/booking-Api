import User from "../modals/User.js";
/* Node.js Bibliothek 
 bcryptjs bietet automatisch Salting an,
 was bedeutet, dass jedem Passwort vor dem Hashing eine
  zufällige Zeichenfolge (Salz) hinzugefügt wird. Dadurch
   wird verhindert, dass identische Passwörter denselben
    Hash-Wert erzeugen, was die Sicherheit erhöht
*/
import bcrypt from "bcryptjs";

//  Fehlerbehandlung ======>
import { createErrro } from "../utils/error.js";

//  Register ======>
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user has been created");
  } catch (error) {
    next(error);
  }
};

//  Login ======>  compare  يقارن
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createErrro(404, "user not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createErrro(400, "Password incorrect or username!"));

    //  name ausgedacht  ==> otherDetails
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    next(error);
  }
};
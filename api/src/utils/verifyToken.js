import jwt from "jsonwebtoken";
import { createErrro } from "./error.js";

// Middleware zur Überprüfung des Tokens
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accesse_token;
  if (!token) {
    return next(createErrro(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createErrro(403, "Token is not valid!"));
    //Die Nmae ausgedacht -> user ===> (req.user )
    req.user = user;
    next();
  });
};

// Middleware zur Überprüfung des Benutzers
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    const userId = req.params.id;
    const userFromToken = req.user;
    if (userFromToken.id === userId || userFromToken.isAdmin) {
      next();
    } else {
      return next(createErrro(403, "You are not authorized!"));
    }
  });
};

// Middleware zur Überprüfung des Administrators
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const userFromToken = req.user;
    // Überprüfen, ob der Benutzer im Token ein Administrator ist
    if (userFromToken.isAdmin) {
      next();
    } else {
      return next(createErrro(403, "You are not authorized!"));
    }
  });
};

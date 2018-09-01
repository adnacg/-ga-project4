import jwt from "jsonwebtoken";
import config from "../config/keys";
import { log } from "util";

/**
 *  The Auth Checker middleware function.
 */
export default db => (req, res, next) => {
  const User = db.User;

  if (!req.headers.authorization) {
    return res.status(401).json({ success: false });
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    // the 401 code is for unauthorized status
    console.log("Before");
    // return res.status(401).json({ success: false });
    if (err) {
      console.log(err);
      return res.status(401).json({ success: false });
    }
    const userId = decoded.userId;

    // check if a user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ success: false });
    }

    req.user = user;
    return next();
  });
};

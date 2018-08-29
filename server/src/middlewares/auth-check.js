import jwt from "jsonwebtoken";
import config from "../config/keys";

/**
 *  The Auth Checker middleware function.
 */
export default db => (req, res, next) => {
  const User = db.User;

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }
    const userId = decoded.userId;

    // check if a user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).end();
    }

    req.user = user;
    return next();
  });
};

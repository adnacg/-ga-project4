import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/keys";

let createAuthControllers = db => {
  const User = db.User;
  return {
    login: async (request, response) => {
      // Find user from form input
      const { email, password } = request.body;
      try {
        const user = await User.findOne({
          where: {
            email: email.trim()
          }
        });
        if (!user) {
          console.log("Did not find one");
          return response.status(401).json({
            success: false,
            errors: [{ field: "email", message: "Email does not exist!" }]
          });
        }

        // Compare passwords
        const validPassword = bcrypt.compareSync(password, user.passwordHash);
        if (!validPassword) {
          return response.status(404).json({
            success: false,
            errors: [{ field: "password", message: "Password does not match!" }]
          });
        }

        // When user credential check out, send him back a token with its user id in the payload
        jwt.sign(
          { userId: user.id, userRole: user.role },
          config.jwtSecret,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              response.json({
                success: false,
                errors: [
                  { field: "none", message: "Error during token creation" }
                ]
              });
            }
            response.json({
              success: true,
              token
            });
          }
        );
      } catch (error) {
        response.json({
          success: false
        });
      }
    }
  };
};

export default createAuthControllers;

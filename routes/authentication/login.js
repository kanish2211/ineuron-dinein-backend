const router = require("express").Router();
const User = require("../../model/user");
const Admin = require("../../model/admin");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/user", async (req, res, next) => {
  const { mobileNumber, name } = req.body;

  try {
    const userData = await User.findOne({ mobileNumber });
    console.log(userData);
    let uniqueId;
    if (userData) {
      const { id: userId } = userData;
      uniqueId = userId;
    } else {
      uniqueId = uuidv4();
      await User.create(new User({ mobileNumber, name, id: uniqueId }));
    }
    const token = jwt.sign(
      { id: uniqueId, date: new Date() },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );
    return res.status(200).json({ token, type: "User" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post(
  "/restaurantLogin",
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").isString().withMessage("Enter a valid password"),
  async (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const errorData = validationError.array();
      const error = errorData[0].msg;
      return res.status(400).json({ error });
    }
    const { email, password } = req.body;
    try {
      const adminData = await Admin.findOne({email});
      if (adminData) {
        const isCorrectPassword = await bcrypt.compare(
          password,
          adminData.password
        );
        if (isCorrectPassword) {
          const token = jwt.sign(
            { id: adminData.id, date: new Date() },
            process.env.JWT_KEY,
            { expiresIn: "30d" }
          );
          return res.status(200).json({ token, type: "Admin" });
        }
      return res.status(400).json({ error: "Email and password does not match" });
      }
      return res.status(400).json({ error: "Email does not exists" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

module.exports = router;

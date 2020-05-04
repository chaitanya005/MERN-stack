var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

//importing routes from controllers 
const { signout, signup } = require("../controllers/auth");

//validations 
router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;

const User = require("../models/user");
const { check, validationResult } = require("express-validator");

//exporting to routers
//singup
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  //saving user in DB
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

//sign out
exports.signout = (req, res) => {
  res.json({
    message: "User signout"
  });
};

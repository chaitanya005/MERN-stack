const User = require("../models/user");
const Order = require("../models/order")
exports.getUserById = (req, res, next, id) => {
  User.find(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //we are declaring undefined to these fields
  //cause this is a getUser controller and after 
  //getting user,user do need to see all these fields
  req.profile.salt = undefined;
  req.profile.secure_password  = undefined
  req.profile.createdAt = undefined
  req.profile.updatedAt = undefined
  return res.json(req.profile);
};

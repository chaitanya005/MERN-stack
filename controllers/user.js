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


//to get all the users from DB
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

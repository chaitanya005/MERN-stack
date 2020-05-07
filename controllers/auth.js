const User = require("../models/user");
const {check,validationResult} = require("express-validator")
const  jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt');
//exporting the controller

exports.signup = (req,res) =>{
    //saving user to DB
    //solving errors using express-validator
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        //422 - error from db 
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    
    const user = new User(req.body)
    user.save((err,user) =>{
        if(err){
            return res.status(400).json({
                err : "NOt able to set user in DB"
            });
        }
        res.json({
            name: user.name,
            id:user._id,
            email:user.email

        });
    });
};


exports.signin = (req,res)  =>{
    const {email,password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        //422 - error from db 
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user)=>{
        if(err){
            return res.status(400).json({
                errror:"User Does  not  exist"
            })
        }

            // if(!user.authenticate(password)){
            //     return res.status(401).json({
            //         error:"Email and password do not match"
            //     })
            // }
        //signin
        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie
        res.cookie("token",token,{expire:new Date() + 9999})

        //send response to frontEnd
        const {_id,name,email,role} = user;
        return res.json({token,user : {_id,name,email,role}})
    });
}

exports.signout = (req,res) =>{
    //to signout just clear the cOOkie
    res.clearCookie("token");
    res.json({
        message : "User signout Sucessfully"
    })
};


//protected routes
//token checker
exports.isSignedIn = express_jwt({
    secret : process.env.SECRET,
    userProperty: "auth"    //auth grabs the user _id 
});


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};

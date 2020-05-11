const express = require("express")
const router = express.Router()
const {check,validatonResult} = require("express-validator")

//we are importing the method from controller
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")

router.post(
    "/signup",
    //checking errors from express- validator 
    [
    check("name","name should be atleast 5 chars") .isLength({ min: 5 }),
    check("email","email is required") .isEmail(),
    check("password") .isLength({ min: 5 })
    ],signup);

router.post(
    "/signin",
    //errors from express- validator 
    [
    check("email","email is required") .isEmail(),
    check("password","Password field is required") .isLength({ min: 5 })
    ],signin);

//testroute
router.get('/testroute',isSignedIn,(req,res) =>{
    res.json(req.auth)  //the token is take from a particualar user and displays _id of that particular USER!!
});


router.get("/signout",signout)


module.exports = router;

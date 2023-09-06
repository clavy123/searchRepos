const User = require("../models/UserModel");
const BigPromise = require("../middleware/promise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async function (req, res, next) {
    const { name, email, password } = req.body;  
    if (!(email || password)) {
      return next(new CustomError("Please Enter the email", 400));
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    cookieToken(user, res);
  });
  
  exports.signin = BigPromise(async function(req,res,next){
       const {email,password}  = req.body
       if(!(email || password)){
        return next(new CustomError("Please provied email and password",400))
       }
       const user = await User.findOne({email}).select('+password')
       if(!user){
        return next(new CustomError("email and password required",400))
       }
       const isPasswordMatched = await user.IsValidatePassword(password)
       if(!isPasswordMatched){
        return next(new CustomError("Pasword does not match",400))
       }
       cookieToken(user,res)
  })
  
  exports.signout = BigPromise(async function(req,res,next){
    res.cookie('token',null,{
      expires : new Date(Date.now()),
      httpOnly:true,
    })
    res.status(200).json({
      success:true,
    })
    
  })
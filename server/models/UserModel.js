const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    maxLength: [30, "Name is limited to 30 character"],
    minLength: [4, "Name should be at least 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    validate: [validator.isEmail, "Please enter a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    maxLength: [30, "Password is limited to 30 character"],
    minLength: [4, "Password should be at least 4 characters long"],
    select: false,
  },
});

//encrypt password before saving document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//validate password with user password
UserSchema.methods.IsValidatePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//creating jwt token
UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES,
  });
};

module.exports = mongoose.model("User", UserSchema);

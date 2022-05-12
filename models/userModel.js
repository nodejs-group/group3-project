const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "email is required"],
    validate: [validator.isEmail, "Please Provide valid email"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
  },
  passwordMatch: {
    type: String,
    required: [true, "please match the password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "password does not match",
    },
  },
  username: {
    type: String,
    require: [true, "username is required"],
    min: [3, "username must be at least 3 characters"],
    max: [20, "username can have at most 20 characters"],
    unique: true,
  },

  profilePicture: {
    type: String,
    default: "default.jpg",
  },
  coverPicture: {
    type: String,
    default: "default-cover.jpg",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
  // desc: {
  //   type: String,
  //   max: 50,
  // },
  // city: {
  //   type: String,
  //   max: 50,
  // },
  // from: {
  //   type: String,
  //   max: 50,
  // },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordMatch = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

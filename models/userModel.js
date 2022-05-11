const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  rollno: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "student", "teacher"],
    default: "student",
  },
  photo: {
    type: String,
    default: "default.jpg",
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

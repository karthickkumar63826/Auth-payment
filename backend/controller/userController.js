const User = require("../models/userModel");
const CustomError = require("../middleware/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const prevUser = await User.findOne({ email: email });

    if (!username || !email || !password) {
      return next(new CustomError("Fill in all details", 422));
    }

    if (prevUser) {
      return next(new CustomError("Email is already taken", 422));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.status(200).json({
      message: `newUser is created and his username is ${newUser.username}`,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new CustomError("Fill in all details", 422));
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return next(
        new CustomError("User is not available, invalid credentials", 422)
      );
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return next(
        new CustomError("Password doesn't match, invalid credential", 422)
      );
    }

    const { _id, username } = user;

    const token = jwt.sign({ _id, username }, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User logged in successfully",
      userDetails: { _id, username: username, token: token },
    });
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(error.message, 500));
  }
};

module.exports = { signup, login };

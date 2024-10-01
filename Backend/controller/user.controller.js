const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const createTokenAndSaveCookie = require("../jwt/generateToken.js");

const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword,username } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
          const existingUser = await User.findOne({username});
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
   
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      username,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    const isMatch = await bcrypt.compare(password, user.password);  
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

 const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
module.exports = {
  signup,
  login,
  logout,
  allUsers,
};
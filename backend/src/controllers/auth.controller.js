const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User Controller
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  // Check if user already exists
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  // Send response
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

// Login User Controller
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

// Logout User Controller
async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

// Foood partner controllers

// registerFoodPartner

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  // Check if food partner already exists
  const isPartnerExist = await foodPartnerModel.findOne({ email });

  if (isPartnerExist) {
    return res.status(400).json({ message: "Food partner already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create food partner
  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = jwt.sign(
    { foodPartnerId: foodPartner._id },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  // Send response
  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

// loginFoodPartner

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

// Logout food partner Controller
function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};

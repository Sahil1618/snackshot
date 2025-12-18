require("dotenv").config();

const express = require("express");
const app = require("./src/app");

const connectDB = require("./src/db/db.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

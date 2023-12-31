const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDatabase;

const _ = require("lodash");
const Cover = require("../../models/coverModel");
// const crypto = require("crypto");

const postCover = async (req, res, next) => {
  const { user = "" } = req.body;
  if (user == "" || req.file_uploaded == "" || req.file_url == "") {
    console.log("Invalid credentials just before upload to Mongo");
    return res
      .status(500)
      .json({ message: "Invalid credentials just before upload to Mongo" });
  }
  const unit = new Cover({
    _id: user,
    file: req.file_uploaded,
    url: req.file_url,
  });
  try {
    const doc = await unit.save();
    console.log(doc);
    res.send(doc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.name + ": " + error.message });
  }
};

module.exports = postCover;

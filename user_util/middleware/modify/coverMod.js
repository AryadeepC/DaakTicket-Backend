const _ = require("lodash");
const Cover = require("../../models/coverModel");

const coverMod = async (req, res, next) => {
  const { user = "" } = req.body;
  if (user == "" || req.file_uploaded == "" || req.file_url == "") {
    console.log("Invalid credentials just after upload to cloudinary...in mod");
    return res.status(500).json({
      message: "Invalid credentials just after upload to cloudinary...in mod",
    });
  }
  try {
    const update_res = await Cover.findByIdAndUpdate(
      user,
      {
        file: req.file_uploaded,
        url: req.file_url,
      },
      { new: false }
    );
    console.log(update_res);
    if(!update_res || _.isEmpty(update_res)){
        console.log("No document found for update. Probably deleted");
        return res.status(404).json({ message: 'Document not found' });
    }
    req.deleted = update_res;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.name + ": " + error.message });
  }
  next();
};
module.exports = coverMod;

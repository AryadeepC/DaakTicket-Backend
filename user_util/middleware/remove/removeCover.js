const Cover = require("../../models/coverModel");
const _ = require("lodash");

const removeCover = async (req, res, next) => {
  const { user: id = "" } = req.query;
  if (id == "") {
    console.log("No id found from client");
    return res.status(400).json({ message: "No id found from client" });
  }

  try {
    const del_resp = await Cover.findByIdAndDelete(id);
    console.log("Delete res[COVER]: ", del_resp);
    // res.send(del_resp);
    if (!del_resp || _.isEmpty(del_resp)) {
      console.log("No document found with that id. Already deleted.");
      return res
        .status(404)
        .json({ message: "No document found with that id. Already deleted." });
    }
    req.deleted = del_resp;
  } catch (error) {
    console.log("Error in del[COVER]: ", error);
    res.status(500).json({ message: error.name + ": " + error.message });
  }
  next();
};

module.exports = removeCover;

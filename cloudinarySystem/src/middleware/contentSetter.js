const { defaultPost } = require("../config/uploadConfig");
const crypto = require("node:crypto");
const _ = require("lodash");

const contentSetter = async (req, res, next) => {
  const { files = [], url: secure_url = [] } = req.upload;
  if (files.length == 0 || secure_url.length == 0) {
    console.log("MISSING FILE AND URL ARRAYS");
    // return res.status(500).json({ message: "MISSING FILE AND URL ARRAYS" });
  }

  const id = crypto.randomUUID();
  // const doc = JSON.parse(JSON.stringify(req.body));
  const doc = req.body;
  if (_.isEmpty(doc) || !doc) {
    console.log("MISSING REQ.BODY OR DOC IN IT", doc);
    return res
      .status(400)
      .json({ message: "Invalid JSON document -- Missing req.body" });
  }
  if (doc.files) {
    delete doc["files"];
  }
  const content = {
    ...doc,
    ...defaultPost,
    id,
    file: files,
    access_url: secure_url,
  };
  console.log("content after cloudinary upload: ", content);
  req.content = content;
  next();
};
module.exports = contentSetter;

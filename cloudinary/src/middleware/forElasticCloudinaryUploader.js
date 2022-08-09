const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../config.env") });
console.log(process.env.CLOUDINARY_DIRECT_UPLOAD_URI)
const { uploadOptions } = require("../config/uploadConfig");
const crypto = require("node:crypto");
const _ = require("lodash");
const { default: axios } = require("axios");

const forElasticCloudinaryUploader = async (req, res, next) => {
  let files = [],
    url = [];

  console.log("The file array is ", req.files);
  if (req.files.length == 0 || !req.files) {
    console.log("MISSING REQ.FILES -- Check multer");
    return res.status(400).json({
      message: "Couldn't find file array in req.file / req.file missing",
    });
  }

  try {
    for (let file of req.files) {
      let file_id = "video";
      const pub_id = crypto.randomUUID();
      const regex = new RegExp("image");
      if (regex.test(file.mimetype)) {
        file_id = "image";
        delete uploadOptions["resource_type"];
        delete uploadOptions["chunk_size"];
      }

      const uploadResponse = await axios.post(
        process.env.CLOUDINARY_DIRECT_UPLOAD_URI,
        {
          file_path: file.path,
          options: {
            ...uploadOptions,
            public_id: pub_id,
          },
        }
      );

      const { data: { public_id = "", secure_url = "" } = {} } = uploadResponse;
      if (public_id == "" || secure_url == "") {
        console.log(
          "MISSING upload url and public id, response.data is ",
          uploadResponse.data
        );
        return res
          .status(500)
          .json({ message: "MISSING upload url and public id in response" });
      }

      file_id = file_id + "&" + public_id;
      files.push(file_id);
      url.push(secure_url);
    }
    console.log(files, url);
    req.upload = { files, url };
  } catch (error) {
    console.log("Error [upload middleware]: " + error.message || error);
    // console.log(error.response.data);
    return res.status(500).json({
      message: error.response.data.message || error.response || error,
    });
  }
  next();
};
module.exports = forElasticCloudinaryUploader;

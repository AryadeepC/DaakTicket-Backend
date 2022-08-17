const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../../config.env") });
const axios = require("axios");

const likeMiddleware = async (req, res, next) => {
  const { c_id = "", owner_id = "", action = null } = req.body;
  if (!c_id || !owner_id || action == null) {
    console.log("Missing content id or owner_id or action");
    return res
      .status(400)
      .json({ message: "Missing content id or owner id or action" });
  }
  try {
    const { data } = await axios.get(process.env.HAS_LIKED_URL, {
      params: {
        c_id,
        owner_id,
      },
    });
    req.midval = { c_id, owner_id, action, liked: data.liked };
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  next();
};
module.exports = likeMiddleware;

const Like = require("../../models/like");

const addLikeController = async (req, res) => {
  const { postId = "", ownerId = "" } = req.body;
  try {
    const foundDoc = await Like.findById(postId);
    if (!foundDoc.listLikes.includes(ownerId)) {
      console.log("Liking post");
      foundDoc.listLikes.push(ownerId);
      await foundDoc.save();
      console.log(foundDoc.listLikes.includes(ownerId));
      return res.send({ liked: foundDoc.listLikes.includes(ownerId) });
    }
    return res.send({ Error: "Already liked" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = addLikeController;

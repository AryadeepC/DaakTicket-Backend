const Message = require("../../model/message");

const getLastChat = async (req, res) => {
  const { user_pair = "" } = req.query;
  const [to, from] = user_pair.split("_");
  try {
    /** This gives an array of messages  */
    const messageList = await Message.find({
      to: { $in: [to, from] },
      from: { $in: [to, from] },
    }).sort({ time: -1 });
    console.log(messageList);
    // if (messageList) {
    res.json({ last_msg: messageList[0] }); // returns array of messages
    // }
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};
module.exports = getLastChat;

const router = require("express").Router();
const {
  getConverstion,
  getConverstionboth,
  newConverstion,
} = require("../../controllers/chat/converstionController");

const {
  getMessages,
  newAddMssages,
} = require("../../controllers/chat/messagesController");
// converstions
router.post("", newConverstion);
router.get("userId", getConverstion);
router.get("/find/:firstUserId/:secondUserId", getConverstionboth);

// messages
router.post("/", newAddMssages);
router.get("/:conversationId", getMessages);

module.exports = router;

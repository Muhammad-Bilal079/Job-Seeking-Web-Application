import express from "express";
import { getMessages, sendMessage,getConversations } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/", getConversations); // New route to get sorted conversations

export default router;

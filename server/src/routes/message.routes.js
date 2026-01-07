import express from "express";
import { chat, sendMessage, deleteMessage, deleteMessages } from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/messages/:userId", protect, chat);
router.post("/send/:userId", protect, sendMessage);
router.delete("/delete/:messageId", protect, deleteMessage);
router.post("/delete-many", protect, deleteMessages);

export default router;
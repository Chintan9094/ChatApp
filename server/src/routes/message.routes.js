import express from "express";
import { chat, sendMessage } from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/messages/:userId", protect, chat);
router.post("/send/:userId", protect, sendMessage);

export default router;
import express from "express";
import { getProfile, updateProfile, getAllUsers } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/getProfile", protect, getProfile);
router.post(
  "/updateProfile",
  protect,
  upload.single("avatar"),
  updateProfile
);
router.get("/getAllUsers", protect, getAllUsers);

export default router;
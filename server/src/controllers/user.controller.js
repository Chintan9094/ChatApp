import { User } from "../models/user.model.js";

export const getProfile = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
};

export const updateProfile = async (req, res, next) => {
  try {
    console.log("REQ.USER ===>", req.user);
    console.log("REQ.USER ID ===>", req.user?._id);
    console.log("REQ.FILE ===>", req.file);
    const { name, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;

    if (req.file && req.file.path) {
      user.avatar = req.file.path;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.json({
            success: true,
            users 
        });
        
    } catch (error) {
        next(error);
    }
};
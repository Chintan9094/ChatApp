import { Message } from "../models/message.model.js";
import { AppError } from "../utils/AppError.js";

export const chat = async (req, res, next) => {
    try {
        const message = await Message.find({
            $or: [
                { senderId: req.user._id, receiverId: req.params.userId },
                { senderId: req.params.userId, receiverId: req.user._id },
            ],
        }).sort({ createdAt: 1 });

        res.json({
            success: true,
            message
        });
        
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { text } = req.body;

        if(!text) {
            next(new AppError("Message text required",400));
        }

        const newMessage = await Message.create({
            senderId: req.user._id,
            receiverId: req.params.userId,
            text
        });

        res.json({
            success: true,
            message: newMessage
        });
        
    } catch (error) {
        next(error);
    }
};
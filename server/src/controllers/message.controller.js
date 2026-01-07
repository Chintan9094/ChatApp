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

export const deleteMessage = async (req, res, next) => {
        console.log("route hit delete single msges---------->")
    try {

        console.log("routes comes here at the try phase in single message delete");

        
        const message = await Message.findById(req.params.messageId);

         console.log("message i d----> ",message);
        if (!message) {
            return next(new AppError("Message not found", 404));
        }
        if (message.senderId.toString() !== req.user._id.toString()) {
            return next(new AppError("You are not authorized to delete this message", 403));
        }
        await message.remove();
        res.json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        next(error);
    }   
};

export const deleteMessages = async (req, res, next) => {
    console.log("route hit delete muiltiple msges---------->")
  try {
      console.log("routes comes here at the try phase in muiltiple message delete")
    const { messageIds } = req.body;

    console.log("message i d----> ",messageIds);
    

    if (!messageIds || !messageIds.length) {
      return next(new AppError("Message IDs required", 400));
    }

    await Message.deleteMany({
      _id: { $in: messageIds },
      senderId: req.user._id,
    });

   return res.json({
      success: true,
      deletedIds: messageIds,
    });
  } catch (error) {
    next(error);
  }
};


import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5174",
      "http://192.168.1.105:5174",
    ],
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("add-user", (userId) => {
    if (!userId) return;

    onlineUsers.set(userId, socket.id);

    console.log("Online users:", Array.from(onlineUsers.keys()));

    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  socket.on("send-msg", ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-msg", {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    let disconnectedUserId = null;

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        onlineUsers.delete(userId);
        break;
      }
    }

    if (disconnectedUserId) {
      console.log("User offline:", disconnectedUserId);
    }

    console.log("Online users:", Array.from(onlineUsers.keys()));

    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

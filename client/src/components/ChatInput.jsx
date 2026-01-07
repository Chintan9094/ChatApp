import { FiSend } from "react-icons/fi";
import api from "../utils/axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

export default function ChatInput({ selectedUser, setMessages }) {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const socket = useSocket();

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await api.post(
        `/message/send/${selectedUser._id}`,
        { text }
      );

      setMessages((prev) => [...prev, res.data.message]);

      socket?.current?.emit("send-msg", {
        senderId: user._id,
        receiverId: selectedUser._id,
        message: res.data.message,
      });

      setText("");
    } catch (error) {
      console.error("Send message failed:", error);
    }
  };

  return (
    <div className="p-3 border-t bg-white flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-1"
      >
        <FiSend />
        Send
      </button>
    </div>
  );
}

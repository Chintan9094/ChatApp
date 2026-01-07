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
    <div className="sticky bottom-0 z-10 p-4 md:p-5 border-t border-white/10 glass flex items-center gap-3 backdrop-blur-xl shadow-lg">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded-2xl px-4 md:px-5 py-3 bg-white/10 border border-white/10 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        aria-label="Message input"
      />

      <button
        onClick={handleSend}
        className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 md:px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-900/40 transition"
        aria-label="Send message"
      >
        <FiSend className="text-lg" />
        <span className="hidden sm:inline font-semibold">Send</span>
      </button>
    </div>
  );
}

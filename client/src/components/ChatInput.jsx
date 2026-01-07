import { FiSend, FiSmile } from "react-icons/fi";
import api from "../utils/axios";
import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

export default function ChatInput({ selectedUser, setMessages }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);
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

  const EMOJIS = [
    "😀","😁","😂","😊","😉","😍","😘","😎","🤩","🤗",
    "😅","😭","😡","🤔","🤷","👍","👎","👏","🙏","🔥",
    "💯","🎉","😴","🤝"
  ];

  const insertEmoji = (emoji) => {
    const input = inputRef.current;
    if (!input) {
      setText((t) => t + emoji);
      return;
    }

    const start = input.selectionStart ?? text.length;
    const end = input.selectionEnd ?? text.length;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    setText(newText);

    // move caret after inserted emoji
    setTimeout(() => {
      input.focus();
      const pos = start + emoji.length;
      input.setSelectionRange(pos, pos);
    }, 0);

    setShowEmoji(false);
  };

  return (
    <div className="sticky bottom-0 z-10 p-4 md:p-5 border-t border-white/10 glass flex items-center gap-3 backdrop-blur-xl shadow-lg relative">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => setShowEmoji((s) => !s)}
          className="p-2 rounded-lg text-slate-200 hover:bg-white/5 transition mr-2"
          aria-label="Open emoji picker"
        >
          <FiSmile className="text-xl" />
        </button>

        {showEmoji && (
          <div className="absolute bottom-12 left-0 bg-slate-800 border border-white/10 rounded-lg p-3 w-64 shadow-xl grid grid-cols-6 gap-2 z-50">
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => insertEmoji(e)}
                className="text-lg p-1 rounded hover:bg-white/5"
                aria-label={`Insert ${e}`}
                type="button"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
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

import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import ProfileSidebar from "../components/ProfileSidebar";
import { FiMessageSquare } from "react-icons/fi";
import api from "../utils/axios";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!selectedUser) return;
    api.get(`/message/messages/${selectedUser._id}`).then((res) => {
      setMessages(res.data.message);
    });
  }, [selectedUser]);

useEffect(() => {
  if (!socket?.current) return;

  socket.current.on("receive-msg", (data) => {
    if (data.senderId === selectedUser?._id) {
      setMessages((prev) => [...prev, data.message]);
    }
  });

  return () => {
    socket.current.off("receive-msg");
  };
}, [selectedUser, socket]);

useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }
}, [messages]);

  return (
    <div className="h-screen flex bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      <Sidebar setSelectedUser={setSelectedUser} />

      <div className="flex-1 flex flex-col h-full max-w-6xl mx-auto w-full overflow-hidden">
        {selectedUser && (
          <ChatHeader
            selectedUser={selectedUser}
            onClick={() => setIsProfileOpen(true)}
          />
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white/5 backdrop-blur border-x border-white/10">
          <div className="p-4 md:p-6 min-h-full flex flex-col">
            {!selectedUser ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 flex-1">
                <div className="p-4 rounded-full bg-white/10 border border-white/10 shadow-lg">
                  <FiMessageSquare size={60} className="text-indigo-300" />
                </div>
                <p className="mt-5 text-lg font-medium text-slate-200">
                  Select a chat to start messaging
                </p>
                <p className="text-sm text-slate-400">Your conversations will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3 pb-2">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    own={msg.senderId?.toString() === user._id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {selectedUser && (
          <ChatInput selectedUser={selectedUser} setMessages={setMessages} />
        )}
      </div>

      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        selectedUser={selectedUser}
      />
    </div>
  );
}

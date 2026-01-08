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
  const [selectedMessages, setSelectedMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!selectedUser) return;

    api.get(`/message/messages/${selectedUser._id}`).then((res) => {
      setMessages(res.data.message);
      setSelectedMessages([]);
    });
  }, [selectedUser]);

  useEffect(() => {
    if (!socket?.current) return;

    socket.current.on("receive-msg", (data) => {
      if (data.senderId === selectedUser?._id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => socket.current.off("receive-msg");
  }, [selectedUser, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelect = (id, senderId) => {
    if (senderId?.toString() !== user._id) return;

    setSelectedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedMessages = async () => {
    try {
      await api.post("/message/delete-many", {
        messageIds: selectedMessages,
      });

      setMessages((prev) =>
        prev.filter((m) => !selectedMessages.includes(m._id))
      );

      setSelectedMessages([]);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSelectUser = (userItem) => {
    setSelectedUser(userItem);
  };

  return (
    <div className="h-dvh md:h-screen flex flex-col md:flex-row bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden">
      <div
        className={`h-full w-full md:w-72 md:shrink-0 ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <Sidebar
          setSelectedUser={handleSelectUser}
          selectedUser={selectedUser}
        />
      </div>

      <div
        className={`flex-1 h-full w-full md:max-w-6xl md:mx-auto overflow-hidden transform transition-transform duration-300 ease-out ${
          selectedUser ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="flex flex-col h-full w-full overflow-hidden">
          {selectedUser && (
            <div className="shrink-0">
              <ChatHeader
                selectedUser={selectedUser}
                onClick={() => setIsProfileOpen(true)}
                onBack={() => setSelectedUser(null)}
              />
            </div>
          )}

          {selectedUser && selectedMessages.length > 0 && (
            <div className="shrink-0 px-4 py-2 bg-red-500/10 border-b border-red-500/20 flex justify-end">
              <button
                onClick={deleteSelectedMessages}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded"
              >
                UnSend Selected ({selectedMessages.length})
              </button>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-white/5 backdrop-blur border-x border-white/10">
            <div className="p-4 md:p-6 min-h-full flex flex-col">
              {!selectedUser ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                  <FiMessageSquare size={60} className="text-indigo-300" />
                  <p className="mt-4 text-lg">Select a chat to start messaging</p>
                </div>
              ) : (
                messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <p className="text-lg font-medium">No messages yet</p>
                      <p className="text-sm mt-2 text-slate-400">Start the conversation by sending a message.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pb-2">
                    {messages.map((msg) => (
                      <MessageBubble
                        key={msg._id}
                        message={msg}
                        own={msg.senderId?.toString() === user._id}
                        onSelect={handleSelect}
                        selected={selectedMessages.includes(msg._id)}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )
              )}
            </div>
          </div>

          {selectedUser && (
            <div className="shrink-0">
              <ChatInput selectedUser={selectedUser} setMessages={setMessages} />
            </div>
          )}
        </div>
      </div>

      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        selectedUser={selectedUser}
      />
    </div>
  );
}

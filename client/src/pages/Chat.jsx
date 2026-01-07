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


  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <Sidebar setSelectedUser={setSelectedUser} />

      <div className="flex-1 flex flex-col">
        {selectedUser && (
          <ChatHeader
            selectedUser={selectedUser}
            onClick={() => setIsProfileOpen(true)}
          />
        )}

        <div className="flex-1 p-4 overflow-y-auto">
          {!selectedUser ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <FiMessageSquare size={60} />
              <p className="mt-4">Select a chat to start messaging</p>
            </div>
          ) : (
            <div className="space-y-2">
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

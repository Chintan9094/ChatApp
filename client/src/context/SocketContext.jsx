import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
        socketRef.current.emit("add-user", user._id);
      });

      socketRef.current.on("connect_error", (err) => {
        console.log("socket error:", err.message);
      });
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};  

export const useSocket = () => useContext(SocketContext);

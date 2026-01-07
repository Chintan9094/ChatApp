import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, loadings } = useAuth();
  const socket = useSocket();

  const [users, setUsers] = useState([]);
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/getAllUsers");

      setUsers(
        res.data.users.map(u => ({
          ...u,
          isOnline: onlineUserIds.includes(u._id),
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadings && user) {
      getAllUser();
    }
  }, [loadings, user]);

  useEffect(() => {
    if (!user || !socket?.current) return;

    socket.current.on("online-users", (ids) => {
      setOnlineUserIds(ids);

      setUsers(prev =>
        prev.map(u => ({
          ...u,
          isOnline: ids.includes(u._id),
        }))
      );
    });

    return () => {
      socket.current.off("online-users");
    };
  }, [user, socket]);

  return (
    <UserContext.Provider value={{ users, getAllUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

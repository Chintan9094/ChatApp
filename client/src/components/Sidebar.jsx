import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import UserItem from "./UserItem";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ setSelectedUser, selectedUser }) {
  const { users, getAllUser, loading } = useUser();
  const {user: authUser, logout } = useAuth();

  useEffect(() => {
    getAllUser();
  }, []);

  if (loading) return <p className="text-center text-slate-200 py-4">Loading Users...</p>;

  return (
    <div className="w-full lg:w-80 border-r border-white/10 glass flex flex-col h-full shadow-2xl overflow-hidden">
      <div className="p-5 border-b border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gradient">Chats</div>
        </div>
        <p className="text-xs text-slate-300 mt-1">Tap a user to open the thread</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {users
        .filter(u => u._id !== authUser?._id)
        .map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onClick={() => setSelectedUser(user)}
            isActive={selectedUser?._id === user._id}
          />
        ))}
      </div>

      <div className="p-4 border-t border-white/10 shrink-0">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full px-4 py-3 gap-3 text-red-200 hover:text-white 
            bg-red-500/10 hover:bg-red-500/30 border border-red-500/30 rounded-2xl transition duration-200 shadow-lg shadow-red-900/30"
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>

    </div>
  );
}

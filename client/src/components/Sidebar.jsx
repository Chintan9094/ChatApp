import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import UserItem from "./UserItem";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ setSelectedUser }) {
  const { users, getAllUser, loading } = useUser();
  const {user: authUser, logout } = useAuth();

  useEffect(() => {
    getAllUser();
  }, []);

  if (loading) return <p>Loading Users...</p>;

  return (
    <div className="w-72 border-r bg-white flex flex-col h-screen">
      
      <div className="p-4 font-bold text-lg border-b">Chats</div>

      <div className="overflow-y-auto flex-1">
        {users
        .filter(u => u._id !== authUser?._id)
        .map((user) => (
          <UserItem key={user._id} user={user} onClick={() => setSelectedUser(user)} />
        ))}
      </div>

      <div className="p-4 border-t flex items-center gap-2 cursor-pointer hover:bg-red-50 text-red-600 font-medium">
         <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-red-400 hover:text-white 
            hover:bg-blue-600 rounded-lg transition"
        >
          <FiLogOut className="text-lg"/>
           <span className="m-1">Logout</span>
        </button>
      </div>

    </div>
  );
}

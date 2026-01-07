import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function ChatHeader({ onClick, selectedUser }) {
  return (
    <div
      onClick={onClick}
      className="p-4 border-b bg-white flex items-center gap-3 cursor-pointer hover:bg-gray-50"
    >
      <img
        className="w-10 h-10 rounded-full"
        src={selectedUser.avatar || DEFAULT_AVATAR}
      />
      <div>
        <p className="font-semibold">{selectedUser.name}</p>
        {selectedUser.isOnline ? (
          <span className="text-xs text-green-600">Online</span>
        ) : (
          <span className="text-xs text-gray-400">Offline</span>
        )}
      </div>
    </div>
  );
}

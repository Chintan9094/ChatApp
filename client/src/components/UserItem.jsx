import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function UserItem({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
    >
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={user.avatar || DEFAULT_AVATAR}
      />

      <div>
        <p className="font-medium">{user.name}</p>

        {user.isOnline ? (
          <span className="text-xs text-green-600">Online</span>
        ) : (
          <span className="text-xs text-gray-400">Offline</span>
        )}
      </div>
    </div>
  );
}

import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function UserItem({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 mx-2 my-1 rounded-2xl cursor-pointer transition hover:-translate-y-0.5 hover:bg-white/10 border border-transparent hover:border-white/10"
    >
      <img
        className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10 shadow-md"
        src={user.avatar || DEFAULT_AVATAR}
      />

      <div>
        <p className="font-semibold text-slate-100">{user.name}</p>

        {user.isOnline ? (
          <span className="text-xs text-emerald-300">Online</span>
        ) : (
          <span className="text-xs text-slate-400">Offline</span>
        )}
      </div>
    </div>
  );
}

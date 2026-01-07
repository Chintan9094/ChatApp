import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function ChatHeader({ onClick, selectedUser }) {
  return (
    <div
      onClick={onClick}
      className="sticky top-0 z-10 p-4 md:p-5 border-b border-white/10 glass flex items-center gap-3 cursor-pointer hover:bg-white/10 transition shadow-lg backdrop-blur-xl"
    >
      <img
        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-400/50 shadow-lg"
        src={selectedUser.avatar || DEFAULT_AVATAR}
      />
      <div className="flex flex-col leading-tight">
        <p className="font-semibold text-slate-50">{selectedUser.name}</p>
        {selectedUser.isOnline ? (
          <span className="text-xs text-emerald-300">Online</span>
        ) : (
          <span className="text-xs text-slate-400">Offline</span>
        )}
      </div>
    </div>
  );
}

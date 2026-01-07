import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function UserItem({ user, onClick, isActive = false }) {
  return (
    <div
      onClick={onClick}
      className={
        `flex items-center gap-3 p-3 mx-2 my-1 rounded-2xl cursor-pointer transition border border-transparent ` +
        (isActive
          ? 'bg-indigo-600/20 ring-1 ring-indigo-500/30 border-indigo-500/20'
          : 'hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/10')
      }
    >
      <img
        className={"w-11 h-11 rounded-full object-cover ring-2 ring-white/10 shadow-md " + (isActive ? 'ring-indigo-400' : '')}
        src={user.avatar || DEFAULT_AVATAR}
      />

      <div>
        <p className={"font-semibold " + (isActive ? 'text-white' : 'text-slate-100')}>{user.name}</p>

        {user.isOnline ? (
          <span className="text-xs text-emerald-300">Online</span>
        ) : (
          <span className="text-xs text-slate-400">Offline</span>
        )}
      </div>
    </div>
  );
}

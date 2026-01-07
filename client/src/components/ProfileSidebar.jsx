import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function ProfileSidebar({ isOpen, onClose, selectedUser }) {
  if (!selectedUser) return null;
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[70%] lg:w-[28%] bg-slate-900/90 glass
        transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 md:p-5 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gradient">User Info</h3>
          <button onClick={onClose} className="text-2xl text-slate-200 hover:text-white transition" aria-label="Close profile sidebar">
            &times;
          </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-3">
          <img
            className="w-24 h-24 rounded-full ring-4 ring-indigo-500/40 shadow-2xl object-cover"
            src={selectedUser.avatar || DEFAULT_AVATAR}
          />
          <h4 className="font-semibold text-lg text-slate-50">{selectedUser.name}</h4>
          <p className="text-sm text-slate-300">{selectedUser.email}</p>
          <p className="text-sm text-slate-300 text-center">
            {selectedUser.bio || "Hey there! I am using ChatApp"}
          </p>
        </div>

        <div className="px-6 space-y-4 text-sm">
          <div className="flex items-center justify-between border border-white/10 rounded-2xl px-4 py-3 bg-white/5">
            <p className="text-slate-200">Status</p>
            {selectedUser.isOnline ? (
              <span className="text-xs text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30">
                Online
              </span>
            ) : (
              <span className="text-xs text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Offline
              </span>
            )}
          </div>

          <div className="border border-white/10 rounded-2xl px-4 py-3 bg-white/5">
            <p className="text-slate-200">Joined</p>
            <p className="font-medium text-slate-50">
              {new Date(selectedUser.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

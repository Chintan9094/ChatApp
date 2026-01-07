import { DEFAULT_AVATAR } from "../constants/defaultAvatar";

export default function ProfileSidebar({ isOpen, onClose, selectedUser }) {
  if (!selectedUser) return null;
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[25%] bg-white border-l shadow-lg
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-lg">User Info</h3>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-3">
          <img
            className="w-24 h-24 rounded-full"
            src={selectedUser.avatar || DEFAULT_AVATAR}
          />
          <h4 className="font-semibold text-lg">{selectedUser.name}</h4>
          <p className="text-sm text-gray-500">{selectedUser.email}</p>
          <p className="text-sm text-gray-500">
            {selectedUser.bio || "Hey there! I am using ChatApp 👋"}
          </p>
        </div>

        <div className="px-6 space-y-4 text-sm">
          <div>
            <p className="text-gray-800">Status</p>
            {selectedUser.isOnline ? (
              <span className="text-xs text-green-600">Online</span>
            ) : (
              <span className="text-xs text-gray-400">Offline</span>
            )}
          </div>

          <div>
            <p className="text-gray-800">Joined</p>
            <p className="font-medium">
              {new Date(selectedUser.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

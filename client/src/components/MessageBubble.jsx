import React from "react";

export default function MessageBubble({
  own,
  message,
  onSelect,
  selected,
}) {
  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      onClick={() => {
        if (!own) return;
        onSelect && onSelect(message._id, message.senderId);
      }}
      className={`relative flex ${own ? "justify-end" : "justify-start"} px-1`}
    >
      <div
        className={`
          max-w-[80%] md:max-w-sm px-4 py-3 rounded-2xl text-sm shadow-lg
          ${own ? "bg-indigo-600 text-white cursor-pointer" : "bg-white/10"}
          ${selected ? "ring-2 ring-red-400" : ""}
        `}
      >
        {message.text}
        <div className="text-[11px] mt-2 text-right opacity-70">
          {time}
        </div>
      </div>
    </div>
  );
}

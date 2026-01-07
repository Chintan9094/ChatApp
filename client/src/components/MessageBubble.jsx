export default function MessageBubble({ own, message }) {

  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"} px-1`}>
      <div
        className={`max-w-[80%] md:max-w-sm px-4 py-3 rounded-2xl text-sm shadow-lg transition ${
          own
            ? "bg-linear-to-br from-indigo-600 to-blue-500 text-white border border-indigo-400/40"
            : "bg-white/10 text-slate-100 border border-white/10"
        }`}
      >
        <div>{message.text}</div>

        <div
          className={`text-[11px] mt-2 text-right ${
            own ? "text-indigo-100/80" : "text-slate-300"
          }`}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

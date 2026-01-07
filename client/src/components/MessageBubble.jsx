export default function MessageBubble({ own, message }) {

  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          own ? "bg-blue-600 text-white" : "bg-gray-300"
        }`}
      >
        <div>{message.text}</div>

        <div
          className={`text-xs mt-1 text-right ${
            own ? "text-blue-200" : "text-gray-600"
          }`}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

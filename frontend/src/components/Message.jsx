function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`message-enter flex gap-3 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
          ${isUser ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-200"}`}
      >
        {isUser ? "U" : "AI"}
      </div>

      
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? "bg-indigo-500 text-white rounded-tr-sm"
            : "bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700"
          }`}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;

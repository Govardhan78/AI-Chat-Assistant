import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import { sendMessage } from "../services/chatService";

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-200">
        AI
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
      </div>
    </div>
  );
}

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      setLoading(true);
      const aiResponse = await sendMessage(currentInput);
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">

      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-800 bg-gray-900">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-4 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>
        <div>
          <h1 className="font-semibold text-white text-sm">AI Assistant</h1>
          <p className="text-xs text-gray-400">Powered by Llama 3.3 · Web search enabled</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </header>

      {/* Messages — centered narrow column like ChatGPT */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-2xl mx-auto px-4">

          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center text-center gap-4 pt-20 pb-16">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-200 mb-1">How can I help you today?</h2>
                <p className="text-sm text-gray-500 max-w-xs">Ask me anything — I'll do my best to help you.</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {["Tell me a fun fact", "What is AI?", "Tell me a joke"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <Message key={i} role={msg.role} content={msg.content} />
          ))}

          {loading && <TypingIndicator />}
          <div ref={bottomRef} />

        </div>
      </div>

      {/* Input — same centered width as messages */}
      <div className="pb-4 pt-2">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-end gap-3 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              placeholder="Ask anything... (Shift+Enter for new line)"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 resize-none outline-none leading-relaxed max-h-40"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="shrink-0 w-8 h-8 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-2">AI can make mistakes. Verify important information.</p>
        </div>
      </div>

    </div>
  );
}

export default ChatBox;

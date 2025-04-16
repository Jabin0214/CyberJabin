'use client';

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setLoading(true);
    setChatLog(prev => [...prev, `🧑: ${trimmedInput}`]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setChatLog(prev => [...prev, `🤖: ${data.reply}`]);
    } catch (error) {
      setChatLog(prev => [...prev, `❌: Failed to get response.`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Chat with Resume</h1>
      <div className="bg-gray-100 p-4 rounded mb-4 h-80 overflow-y-auto space-y-2">
        {chatLog.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || input.trim() === ""}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
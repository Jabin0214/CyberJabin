'use client';

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, User, Bot } from "lucide-react";
import { sendChatMessage } from "../utils/api";


export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<Array<{role: "user" | "assistant" | "system", content: string}>>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [chatLog]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setLoading(true);
    setChatLog(prev => [...prev, { role: "user", content: trimmedInput }]);
    setInput("");

    try {
      const reply = await sendChatMessage(trimmedInput);
      setChatLog(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setChatLog(prev => [...prev, { role: "system", content: "Failed, Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Jabin </h1>
          <div className="text-sm font-medium text-gray-500">AI Jabin</div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden max-w-4xl w-full mx-auto p-4 flex flex-col">
        {/* Chat container */}
        <div className="flex-1 overflow-y-auto rounded-lg bg-white border shadow-sm mb-4 p-4">
          {chatLog.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Bot size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Wellcome </h3>
              <p className="text-gray-500 max-w-md">
                You can ask me any question about Jabin
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {chatLog.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-3/4 rounded-lg p-3 ${
                      msg.role === "user" 
                        ? "bg-blue-500 text-white rounded-br-none" 
                        : msg.role === "system" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.role !== "user" && (
                        <div className={`mt-1 ${msg.role === "system" ? "text-red-500" : "text-blue-500"}`}>
                          {msg.role === "assistant" ? <Bot size={16} /> : "⚠️"}
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      {msg.role === "user" && (
                        <div className="mt-1 text-white">
                          <User size={16} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="bg-white rounded-lg border shadow-sm p-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-12 max-h-32"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Feel free to ask..."
              disabled={loading}
              rows={1}
              style={{ 
                height: "auto", 
                minHeight: "2.5rem", 
                maxHeight: "8rem" 
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-blue-500 h-10 w-10 flex items-center justify-center flex-shrink-0"
              onClick={sendMessage}
              disabled={loading || input.trim() === ""}
              aria-label="send"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-2 text-right">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </main>
    </div>
  );
}
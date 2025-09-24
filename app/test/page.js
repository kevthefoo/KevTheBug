"use client";

import React, { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("Ask me anything!");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/kevingpt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuestion: input }),
    });
    const data = await response.json();
    const answer = data.answer;
    setMessage(answer);
    setLoading(false);
    setInput("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-md flex-col rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">KevinGPT</h2>
        <div className="mb-4 max-h-64 flex-1 space-y-2 overflow-y-auto">
          {message}
          {loading && (
            <div className="flex justify-start">
              <span className="animate-pulse rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-800">
                Bot is typing...
              </span>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

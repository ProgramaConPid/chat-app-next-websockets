'use client'

import React, { useState } from "react";

interface SendMessage {
  onSendMessage: (message: string) => void;
}

export const ChatForm = ({onSendMessage}:SendMessage) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        onChange={(e) =>  setMessage(e.target.value)}
        className="flex-1 px-4 border-2 border-sky-500 py-2 rounded-lg focus:outline-none"
        placeholder="Type your message here..."
      />
      <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer">
        Send
      </button>
    </form>
  );
};

import React from "react";

interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

export const ChatMessage = ({sender, message, isOwnMessage}: ChatMessageProps) => {
  const isSystemMessage = sender === "system";
  return (
    <div
      className={`flex ${
        isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : ""
      } mb-3`}
    >
      <div className={`max-w-xs px-4 py-2 rounded-lg ${
        isSystemMessage 
          ? "bg-grey-800 text-xs text-center text-white"
          : isOwnMessage
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }`}>
        {isSystemMessage ?? <p className="text-sm font-bold">{sender}</p>}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

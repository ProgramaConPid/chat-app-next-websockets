"use client";

import { ChatForm } from "@/components/ChatForm";
import { ChatMessage } from "@/components/ChatMessage";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMesasges] = useState<
    { sender: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("");
  const handleJoinRoom = () => {
    setJoined(true);
  }

  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div className="flex mt-24 justify-center w-full">
      {!joined ? (
        <div className="flex w-full max-w-3xl mx-auto flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold">Join a Room</h1>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"
          />
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room name"
            className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"
          />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room: 1</h1>
          <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 rounded-lg">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { FiSend, FiMoreVertical, FiUser } from "react-icons/fi";

interface ChatBubbleProps {
  sender: string;
  message: string;
  time: string;
  isSender: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  sender,
  message,
  time,
  isSender,
}) => {
  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"} mb-3`}>
      <div className="chat-header">
        {sender}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div
        className={`chat-bubble ${
          isSender ? "bg-gray-300" : "bg-gray-200"
        } text-black`}
      >
        {message}
      </div>
    </div>
  );
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatBubbleProps[]>([
    {
      sender: "John Doe",
      message: "Hey, how's it going?",
      time: "12:00 PM",
      isSender: false,
    },
    {
      sender: "You",
      message: "I'm good! What about you?",
      time: "12:01 PM",
      isSender: true,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: ChatBubbleProps = {
      sender: "You",
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
    };

    setChatLog([...chatLog, newMessage]);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="rounded-lg w-full h-full flex flex-col bg-base-200 p-3">
      {/* Condensed Top Bar with Avatar, Username, and 3-dot Icon */}
      <div className="flex items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <FiUser size={30} />
          </div>
          <div>
            <h2 className="font-bold text-md">John Doe</h2>
            <span className="text-sm opacity-70">Online</span>
          </div>
        </div>
        {/* 3-dot Vertical Icon */}
        <div className="flex items-center">
          <FiMoreVertical className="text-xl cursor-pointer" />
        </div>
      </div>

      <div className="divider my-1" />

      {/* Chat Bubbles */}
      <div className="flex-1 overflow-auto">
        {chatLog.map((chat, index) => (
          <ChatBubble key={index} {...chat} />
        ))}
      </div>

      {/* Message Input Bar */}
      <div className="mt-3 flex items-center gap-2 p-3 bg-base-300 rounded-lg">
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send on Enter
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          <FiSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
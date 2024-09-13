import { useSocketContext } from "../contexts/useSocketContext";
import { generateRandomChatLog } from "../assets/randomGenerator";
import ChatBubble from "../Components/ChatBubble";
import { useState, useEffect } from "react";
import { FiSend, FiMoreVertical, FiUser } from "react-icons/fi";

type ChatProps = {
  chatId: string | null;
};

const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatBubbleProps[]>([]);

  const {sendMessage} = useSocketContext()

  useEffect(() => {
    if (chatId) {
      const randomLog = generateRandomChatLog();
      setChatLog(randomLog);
    }
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    sendMessage(message)

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

  if (!chatId) {
    return (
      <div className="rounded-lg w-full h-full flex items-center justify-center bg-base-200 p-3">
        <span className="text-lg opacity-70">Click a chat to start a conversation.</span>
      </div>
    );
  }

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
        <button className="btn btn-ghost btn-circle ">
          <FiMoreVertical size={24} />
        </button>
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

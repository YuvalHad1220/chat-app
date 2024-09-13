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

export default ChatBubble;

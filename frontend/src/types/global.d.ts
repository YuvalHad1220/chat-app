interface ChatBubbleProps {
  sender: string;
  message: string;
  time: string;
  isSender: boolean;
}

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  timeSent: string;
};

type User = {
  chatId: string;
  username: string;
};

type PayloadType = "MSG" | "USER";

// Define a union type for different payloads
type Payload =
  | {
      payloadType: "MSG";
      payloadContent: Message;
    }
  | {
      payloadType: "USER";
      payloadContent: User;
    };



interface UserChatCard extends User {
  active?: boolean;
  onClick: () => void;
  latestMessage?: string;
  timestamp: string;
}

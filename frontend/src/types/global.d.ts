interface ChatBubbleProps {
  sender: string;
  message: string;
  time: string;
  isSender: boolean;
}

interface iUserChatCard {
  active?: boolean;
  onClick: () => void;
  latestMessage?: string;
  fullName: string;
  timestamp: string;
}

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  timeSent: string;
};

type PayloadType = "MSG" | "";

// Define a union type for different payloads
type Payload =
  | {
      payloadType: "MSG";
      payloadContent: Message;
    }
  | {
      payloadType: "OTHER";
      payloadContent: any; // Define other types if needed
    };

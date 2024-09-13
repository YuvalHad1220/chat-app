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
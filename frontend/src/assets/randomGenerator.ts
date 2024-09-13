const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateRandomUser = (): Omit<UserChatCard, "onClick" | "chatId"> => {
  const names = [
    "Alice Smith",
    "Bob Johnson",
    "Carol Williams",
    "Dave Brown",
    "Eve Davis",
  ];
  const messages = [
    "Hey there!",
    "How’s it going?",
    "Let’s catch up soon.",
    "Can we talk later?",
    "Meeting at 3 PM.",
  ];
  const timestamps = ["1m ago", "5m ago", "10m ago", "1h ago", "3h ago"];

  return {
    latestMessage: getRandomElement(messages),
    username: getRandomElement(names),
    timestamp: getRandomElement(timestamps),
  };
};

export const generateRandomUsers = (count: number): Omit<UserChatCard, "onClick" | "chatId">[] => {
  return Array.from({ length: count }, generateRandomUser);
};

const randomMessages = [
  "Hey, what's up?",
  "I'm doing great!",
  "Let's meet up soon.",
  "Have you seen the latest news?",
  "That's awesome!",
  "I totally agree with you.",
  "Catch you later!",
  "Sounds good!",
];

const randomNames = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];


export const generateRandomChatLog = (): ChatBubbleProps[] => {
  const randomCount = Math.floor(Math.random() * 6) + 3; // Random number between 3 and 8
  const chatLog: ChatBubbleProps[] = [];

  for (let i = 0; i < randomCount; i++) {
    const isSender = Math.random() > 0.5;
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];

    chatLog.push({
      sender: isSender ? "You" : randomName,
      message: randomMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isSender,
    });
  }

  return chatLog;
};
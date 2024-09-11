const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateRandomUser = (): iUserChatCard => {
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
    fullName: getRandomElement(names),
    timestamp: getRandomElement(timestamps),
  };
};

export const generateRandomUsers = (count: number): iUserChatCard[] => {
  return Array.from({ length: count }, generateRandomUser);
};

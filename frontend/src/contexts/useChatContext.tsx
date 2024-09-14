import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { useSearchParamsState } from "react-use-search-params-state";

// Define the type for your filter state
type SearchParamsStateType = {
  chatId: { type: "string"; default: string | null };
};

// Create the context type
type ChatContextType = {
  chatId: string;
  setChatId: (chatId: string) => void
  selfChatId: string
  setSelfChatId: (selfChatId: string) => void
};

// Default values for the context
const filtersDefaults: SearchParamsStateType = {
  chatId: { type: "string", default: null },
};

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create the provider component
export const ParamsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const localStorageKey = 'selfChatId';
  const [selfChatId, setSelfChatId] = useState<string>(localStorage.getItem(localStorageKey) || "");
  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults);

    // Update local storage whenever selfChatId changes
    const updateSelfChatId = (chatId: string) => {
      setSelfChatId(chatId);
      localStorage.setItem(localStorageKey, chatId);
    };


  return (
    <ChatContext.Provider value={{ setSelfChatId: updateSelfChatId, selfChatId, chatId: filterParams.chatId, setChatId: (chatId: string) => setFilterParams({chatId}) }}>
      {children}
    </ChatContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useParamsContext must be used within a ParamsProvider");
  }
  return context;
};
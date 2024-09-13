import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the type for your socket context
type SocketContextType = {
  socket: WebSocket | null;
  sendMessage: (message: string) => void;
};

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Create the provider component
export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Initialize the WebSocket connection using native WebSocket API
    const newSocket = new WebSocket(import.meta.env.VITE_SOCKET_CONN); // This should work with your "/ws" path

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onmessage = (event) => {
      console.log("Message received:", event.data);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
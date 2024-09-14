import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the type for your socket context
type SocketContextType = {
  socket: WebSocket | null;
  socketData: string
  sendPayload: (payload: Payload) => void; // Changed method name to reflect sending structured payloads
};

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Create the provider component
export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState("");

  useEffect(() => {
    // Initialize the WebSocket connection
    const newSocket = new WebSocket(import.meta.env.VITE_SOCKET_CONN);

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
      setSocketData(event.data)
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendPayload = (payload: Payload) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const serializedPayload = JSON.stringify(payload);
      socket.send(serializedPayload);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendPayload, socketData }}>
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

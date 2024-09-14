import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./Layout/MainLayout";
import { ParamsProvider } from "./contexts/useChatContext.tsx";
import { SocketProvider } from "./contexts/useSocketContext.tsx";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ParamsProvider>
          <MainLayout />
        </ParamsProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;

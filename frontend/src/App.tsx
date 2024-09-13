import MainLayout from "./Layout/MainLayout";
import { ParamsProvider } from "./contexts/useParamsContext.tsx";
import { SocketProvider } from "./contexts/useSocketContext.tsx";
function App() {
  return (
    <ParamsProvider>
      <SocketProvider>
        <MainLayout />
      </SocketProvider>
    </ParamsProvider>
  );
}

export default App;

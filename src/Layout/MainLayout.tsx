import Chat from "./Chat";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen gap-3 p-3 ">
      <div className="w-[20%] rounded-xl flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="w-[80%] flex items-center justify-center">
        <Chat />
      </div>
    </div>
  );
};

export default MainLayout;

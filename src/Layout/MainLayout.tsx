import Chat from "./Chat";
import Sidebar from "./Sidebar";
import {
  useSearchParamsState,
  SearchParamsStateType,
} from "react-use-search-params-state";

const MainLayout = () => {
  const filtersDefaults: SearchParamsStateType = {
    chatId: { type: "string", default: null },
  };

  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults);

  return (
    <div className="flex h-screen gap-3 p-3">
      <div className="w-[20%] rounded-xl flex items-center justify-center">
        <Sidebar
          chatId={filterParams.chatId}
          setChatId={(chatId) => setFilterParams({ chatId })}
        />
      </div>
      <div className="w-[80%] flex items-center justify-center">
        <Chat chatId={filterParams.chatId} />
      </div>
    </div>
  );
};

export default MainLayout;

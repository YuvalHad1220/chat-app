import { useMemo } from "react";
import UserChatCard from "../Components/UserChatCard";
import {
  FiSettings,
  FiPlus,
  FiArrowUpCircle,
  FiArrowDownCircle,
} from "react-icons/fi"; // Importing scroll icons
import useScrollIndicators from "../hooks/useScrollIndicators";
import { generateRandomUsers } from "../assets/randomGenerator";
import useDebounce from "../hooks/useDebounce";
import CreateChatModal from "../Modals/CreateChatModal";
import useModal from "../hooks/useModal";
import SettingsModal from "../Modals/SettingsModal";

type SidebarProps = {
  chatId: string | null;
  setChatId: (chatId: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ chatId, setChatId }) => {
  const {
    isOpen: isChatModalOpen,
    openModal: openChatModal,
    closeModal: closeChatModal,
  } = useModal();

  const {
    isOpen: isSettingsModalOpen,
    openModal: openSettingsModal,
    closeModal: closeSettingsModal,
  } = useModal();


  const {
    showTopScroll,
    showBottomScroll,
    scrollableRef,
    scrollTop,
    scrollBottom,
  } = useScrollIndicators();
  const [intermediateValue, debouncedValue, setIntermediateValue] = useDebounce(
    "",
    200
  );

  const users = useMemo(() => generateRandomUsers(90), []);
  const filteredUsers = useMemo(() => {
    if (!debouncedValue) return users;
    return users.filter((u) => u.fullName.includes(debouncedValue));
  }, [users, debouncedValue]);

  const hasUsers = users.length > 0;
  const hasFilteredUsers = filteredUsers.length > 0;

  return (
    <>
      <CreateChatModal isOpen={isChatModalOpen} closeModal={closeChatModal} />
      <SettingsModal isOpen={isSettingsModalOpen} closeModal={closeSettingsModal} />
      <div className="rounded-lg w-full h-full flex flex-col p-3 bg-base-200">
        {/* Top bar */}
        <div className="flex items-center gap-1">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="input input-outline flex-1"
            value={intermediateValue}
            onChange={(e) => setIntermediateValue(e.target.value)}
          />

          {/* Settings Button */}
          <button className="btn btn-ghost btn-circle" onClick={openSettingsModal}>
            <FiSettings size={24} />
          </button>

          <button className="btn btn-ghost btn-circle" onClick={openChatModal}>
            <FiPlus size={24} />
          </button>
        </div>

        {/* Divider */}
        <div className="divider my-1" />

        {/* Scrollable chat list container */}
        <div className="relative flex-1 overflow-hidden">
          {showTopScroll && (
            <div className="absolute top-2 left-0 right-0 m-auto z-10 opacity-85 w-fit">
              <button onClick={scrollTop} className="btn btn-circle">
                <FiArrowUpCircle size={24} className="text-gray-500" />
              </button>
            </div>
          )}
          <div
            ref={scrollableRef}
            className="overflow-auto no-scrollbar h-full scroll-smooth relative rounded-box"
          >
            {!hasUsers ? (
              <div className="text-center text-lg opacity-70 mt-4">
                No users found. Click + to start a new chat.
              </div>
            ) : !hasFilteredUsers ? (
              <div className="text-center text-lg opacity-70 mt-4">
                No users with that name.
              </div>
            ) : (
              <ul className="menu w-full bg-base-100 rounded-box">
                {filteredUsers.map((user, index) => (
                  <UserChatCard
                    timestamp={user.timestamp}
                    fullName={user.fullName}
                    latestMessage={user.latestMessage}
                    key={index}
                    onClick={() => setChatId(index.toFixed())}
                    active={index.toFixed() === chatId}
                  />
                ))}
              </ul>
            )}
          </div>
          {showBottomScroll && (
            <div className="absolute bottom-2 left-0 right-0 m-auto z-10 opacity-85 w-fit">
              <button onClick={scrollBottom} className="btn btn-circle">
                <FiArrowDownCircle size={24} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

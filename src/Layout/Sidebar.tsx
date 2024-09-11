import { useEffect, useState } from "react";
import UserChatCard from "../Components/UserChatCard";
import {
  FiSettings,
  FiPlus,
  FiArrowUpCircle,
  FiArrowDownCircle,
} from "react-icons/fi"; // Importing scroll icons
import useScrollIndicators from "../hooks/useScrollIndicators";
import { generateRandomUsers } from "../assets/randomGenerator";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const {
    showTopScroll,
    showBottomScroll,
    scrollableRef,
    scrollTop,
    scrollBottom,
  } = useScrollIndicators();
  return (
    <div className="rounded-lg w-full h-full flex flex-col p-3 bg-base-200">
      {/* Top bar */}
      <div className="flex items-center gap-1">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="input input-outline flex-1"
        />

        {/* Settings Button */}
        <button className="btn btn-ghost btn-circle">
          <FiSettings size={24} />
        </button>

        <button className="btn btn-ghost btn-circle">
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
          <ul className="menu w-full bg-base-100">
            {generateRandomUsers(900).map((user, index) => (
              <UserChatCard
                timestamp={user.timestamp}
                fullName={user.fullName}
                latestMessage={user.latestMessage}
                key={index}
                onClick={() => setActive(index)}
                active={index === active}
              />
            ))}
          </ul>
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
  );
};

export default Sidebar;

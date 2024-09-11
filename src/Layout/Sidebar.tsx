import { useState,  } from "react";
import UserChatCard from "../Components/UserChatCard";
import { FiSettings, FiPlus, FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi"; // Importing scroll icons
import useScrollIndicators from "../hooks/useScrollIndicators";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const { showTopScroll, showBottomScroll, scrollableRef } = useScrollIndicators();

  return (
    <div className="rounded-lg w-full h-full flex flex-col p-3 bg-base-200">
      {/* Top bar */}
      <div className="flex items-center gap-1 mb-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="input input-outline flex-1"
        />

        {/* Settings Button */}
        <button className="btn btn-ghost">
          <FiSettings size={20} />
        </button>

        <button className="btn btn-ghost">
          <FiPlus size={20} />
        </button>
      </div>

      {/* Divider */}
      <div className="divider my-1" />

      {/* Scrollable chat list container */}
      <div className="relative flex-1 overflow-hidden">
        {showTopScroll && (
          <div className="absolute top-2 left-0 right-0 flex justify-center">
            <FiArrowUpCircle size={24} className="text-gray-500" />
          </div>
        )}
        <div
          ref={scrollableRef}
          className="overflow-auto no-scrollbar h-full scroll-smooth relative rounded-box"
        >
          <ul className="menu w-full bg-base-100">
            {Array.from(Array(90).keys()).map((_, index) => (
              <UserChatCard key={index} onClick={() => setActive(index)} active={index === active}/>
            ))}
          </ul>
        </div>
        {showBottomScroll && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <FiArrowDownCircle size={24} className="text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { FiUser } from "react-icons/fi";
import classNames from "classnames";

interface iUserChatCard {
  active?: boolean;
  onClick: () => void;
}

const UserChatCard: React.FC<iUserChatCard> = ({ active, onClick }) => {
  return (
    <li onClick={onClick}>
      <a
        className={classNames(
          "flex items-center space-x-4",
          { active }
        )}
      >
        <div className="avatar">
          <FiUser size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="font-bold">Sammy</span>
            <span className="text-sm text-gray-400">9w ago</span>
          </div>
          <p className="text-sm text-gray-500">Let's meet up tomorrow!</p>
        </div>
      </a>
    </li>
  );
};

export default UserChatCard;

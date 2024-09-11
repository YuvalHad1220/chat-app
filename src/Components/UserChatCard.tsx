import React from "react";
import { FiUser } from "react-icons/fi";
import classNames from "classnames";

interface iUserChatCard {
  active?: boolean;
  onClick: () => void;
  latestMessage?: string;
  fullName: string;
  timestamp: string;
}

const UserChatCard: React.FC<iUserChatCard> = ({
  active,
  onClick,
  fullName,
  timestamp,
  latestMessage,
}) => {
  return (
    <li onClick={onClick}>
      <a className={classNames("flex items-center space-x-4", { active })}>
        <div className="avatar">
          <FiUser size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="font-bold">{fullName}</span>
            <span className="text-sm text-gray-400">{timestamp}</span>
          </div>
          {latestMessage && (
            <p className="text-sm text-gray-500">{latestMessage}</p>
          )}
        </div>
      </a>
    </li>
  );
};

export default UserChatCard;

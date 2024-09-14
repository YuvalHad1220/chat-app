import React, { useState } from "react";
import classNames from "classnames";
import LoadingButton from "../Components/LoadingButton";

type SettingsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  defaultSelfChatId: string,
  setSelfChatId: (selfChatId: string) => void
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, closeModal, setSelfChatId, defaultSelfChatId }) => {
  const [chatId, setChatId] = useState(defaultSelfChatId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelfChatId(chatId)
    // Log the chosen chat ID
    console.log("Preferred Chat ID:", chatId);

    // Optionally close the modal after submission
    closeModal();
  };

  return (
    <div className={classNames("modal", { "modal-open": isOpen })}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Settings</h3>
        <p className="pt-0 pb-4">Choose your preferred chat ID.</p>

        {/* Form to handle settings */}
        <form onSubmit={handleSubmit}>
          {/* Input for Chat ID */}
          <div className="mb-4">
            <label htmlFor="chatId" className="block text-sm font-medium">
              Chat ID
            </label>
            <input
              type="text"
              id="chatId"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Modal action buttons */}
          <div className="modal-action">
            {/* Save Settings button */}
            <LoadingButton
              type="submit"
              className="btn bg-gray-700 text-white hover:bg-gray-800"
            >
              Save Settings
            </LoadingButton>

            {/* Close button */}
            <button type="button" className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;

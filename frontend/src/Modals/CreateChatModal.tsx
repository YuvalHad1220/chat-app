import React, { useState } from "react";
import classNames from "classnames";
import LoadingButton from "../Components/LoadingButton";

type CreateChatModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [chatId, setChatId] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Log the chat ID and username
    console.log("Chat ID:", chatId);
    console.log("Username:", username);

    // Optionally close the modal after submission
    closeModal();
  };

  return (
    <div className={classNames("modal", { "modal-open": isOpen })}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Chat</h3>
        <p className="pt-0 pb-4">
          Enter a chat ID and your username to create a new chat.
        </p>

        {/* Form to handle chat creation */}
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

          {/* Input for Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Modal action buttons */}
          <div className="modal-action">
            {/* Submit button */}
            <LoadingButton
              type="submit"
              isLoading
              className="btn bg-gray-700 text-white hover:bg-gray-800"
            >
              Create Chat
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

export default CreateChatModal;

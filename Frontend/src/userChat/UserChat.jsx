import React, { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext.jsx";

const UserChat = () => {
  const { addChat, addMessage } = useContext(ChatContext);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [userId] = useState(`User-${Math.random().toString(36).substr(2, 9)}`);

  const sendMessage = () => {
    if (!selectedProblem && !customMessage) return;
    const message = customMessage || selectedProblem;

    addChat({
      id: userId,
      user: userId,
      issue: selectedProblem,
      messages: [{ sender: "user", message }],
    });

    setCustomMessage("");
    setSelectedProblem("");
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="bg-blue-600 text-white text-center py-3 text-lg font-bold">
        Live Chat Support
      </div>
      <div className="flex-1 p-4 bg-white">
        <textarea
          className="p-2 border rounded resize-none w-full h-20"
          placeholder="Type your message here..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;

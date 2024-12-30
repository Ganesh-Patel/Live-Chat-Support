import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";

const AdminChatSupport = () => {
  const { chats, updateChat, addMessage } = useContext(ChatContext);
  const [activeChat, setActiveChat] = useState(null);
  const [response, setResponse] = useState("");

  const handlePickChat = (chat) => {
    updateChat(chat, "new");
    setActiveChat(chat);
  };

  const sendMessage = () => {
    if (!response || !activeChat) return;
    addMessage(activeChat.id, "admin", response);
    setResponse("");
  };

  const handleResolveChat = () => {
    updateChat(activeChat, "active");
    setActiveChat(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r">
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-bold">
          Chat Requests
        </div>
        <ul>
          {chats.new.map((chat) => (
            <li
              key={chat.id}
              onClick={() => handlePickChat(chat)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {chat.user}: {chat.issue}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="bg-blue-600 text-white text-center py-3">
              Chat with {activeChat.user}
            </div>
            <div className="flex-1 bg-white p-4">
              {(activeChat.messages || []).map((msg, index) => (
                <div
                  key={index}
                  className={`text-${msg.sender === "admin" ? "right" : "left"}`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="flex p-4 bg-gray-200">
              <textarea
                className="flex-1 border rounded resize-none"
                placeholder="Type your message..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <button onClick={sendMessage} className="bg-blue-600 text-white">
                Send
              </button>
              <button onClick={handleResolveChat} className="bg-green-600 text-white">
                Resolve
              </button>
            </div>
          </>
        ) : (
          <div className="text-center flex-1">Select a chat</div>
        )}
      </div>
    </div>
  );
};

export default AdminChatSupport;

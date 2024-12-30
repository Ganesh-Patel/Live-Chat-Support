import React, { useState } from "react";

const AdminChat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [response, setResponse] = useState("");

  const chats = [
    { id: 1, user: "User1", issue: "Order not delivered" },
    { id: 2, user: "User2", issue: "Payment issue" },
  ];

  const selectChat = (chat) => {
    setActiveChat(chat);
    setChatMessages([
      { sender: "user", message: chat.issue },
      { sender: "admin", message: "Hello! How can I assist you?" },
    ]);
  };

  const sendMessage = () => {
    if (!response) return;
    setChatMessages((prev) => [...prev, { sender: "admin", message: response }]);
    setResponse("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r">
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-bold">
          Chat Requests
        </div>
        <ul className="divide-y">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => selectChat(chat)}
              className="p-3 cursor-pointer hover:bg-gray-200"
            >
              <div className="font-bold">{chat.user}</div>
              <div className="text-sm text-gray-500">{chat.issue}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="bg-blue-600 text-white text-center py-3 text-lg font-bold">
              Chat with {activeChat.user}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-white">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-sm p-3 rounded-lg text-white ${
                      msg.sender === "admin" ? "bg-blue-500" : "bg-gray-500"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-200 flex">
              <textarea
                className="flex-1 p-2 border rounded resize-none"
                placeholder="Type your response..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-2 ml-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">Select a chat to start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;

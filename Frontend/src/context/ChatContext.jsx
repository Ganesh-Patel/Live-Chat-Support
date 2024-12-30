import React, { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState({
    new: [],
    active: [],
    resolved: [],
  });

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || {
      new: [],
      active: [],
      resolved: [],
    };
    setChats(savedChats);
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const addChat = (chat) => {
    setChats((prev) => ({ ...prev, new: [...prev.new, chat] }));
  };

  const updateChat = (chat, status) => {
    setChats((prev) => {
      const newChats = prev[status].filter((c) => c.id !== chat.id);
      return {
        ...prev,
        [status]: [...newChats],
        [status === "new" ? "active" : "resolved"]: [...prev[status === "new" ? "active" : "resolved"], chat],
      };
    });
  };

  const addMessage = (chatId, sender, message) => {
    setChats((prev) => {
      const updateChats = (chats) =>
        chats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...(chat.messages || []), { sender, message }] }
            : chat
        );
      return {
        new: updateChats(prev.new),
        active: updateChats(prev.active),
        resolved: prev.resolved,
      };
    });
  };

  return (
    <ChatContext.Provider value={{ chats, addChat, updateChat, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

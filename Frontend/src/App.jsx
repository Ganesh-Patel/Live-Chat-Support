import { useState } from "react";
import AdminChatSupport from "./serverSupport/AdminChatSupport.jsx";
import UserChatSupport from "./userChat/UserChat.jsx";
function App() {
  const [role, setRole] = useState("user"); // "admin" or "user"

  return (
    <div className="h-screen bg-gray-500">
      {/* Role Selector */}
      <div className="flex justify-center py-4">
        <button
          onClick={() => setRole("user")}
          className={`px-4 py-2 rounded-l ${
            role === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          User
        </button>
        <button
          onClick={() => setRole("admin")}
          className={`px-4 py-2 rounded-r ${
            role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Admin
        </button>
      </div>

      {/* Conditional Rendering */}
      {role === "user" ? <UserChatSupport /> : <AdminChatSupport />}
    </div>
  );
}

export default App;

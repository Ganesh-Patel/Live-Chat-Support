const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Frontend URL
        methods: ["GET", "POST"],
    },
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/livechat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Message Schema and Model
const messageSchema = new mongoose.Schema({
    userId: String,
    messages: [
        {
            sender: String, // 'user' or 'admin'
            message: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Message = mongoose.model("Message", messageSchema);

// WebSocket Connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_chat", async ({ userId }) => {
        console.log(`User ${userId} joined the chat.`);
        socket.join(userId);

        // Fetch chat history
        const chat = await Message.findOne({ userId });
        socket.emit("chat_history", chat ? chat.messages : []);
    });

    socket.on("send_message", async ({ userId, sender, message }) => {
        const chat = await Message.findOneAndUpdate(
            { userId },
            {
                $push: { messages: { sender, message } },
            },
            { upsert: true, new: true }
        );

        // Send to admin or user
        io.to(userId).emit("receive_message", { sender, message });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

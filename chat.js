const socket = io("http://127.0.0.1:5000");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Get stored room name
const room = localStorage.getItem("chatRoom") || "default_room";

// Fetch messages from the backend when the page loads
async function fetchMessages() {
    try {
        const response = await fetch(`http://127.0.0.1:5000/messages/${room}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        chatBox.innerHTML = "";
        data.messages.forEach(msg => {
            const messageElement = document.createElement("p");
            messageElement.innerText = `${msg.timestamp} - ${msg.sender}: ${msg.message}`;
            chatBox.appendChild(messageElement);
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}


// Load previous messages when joining
fetchMessages();

// Join the chat room
socket.emit("join", { user: "User1", room: room });

// Send messages
sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        socket.emit("message", { user: "User1", message: message, room: room });
        messageInput.value = "";
    }
});

// Receive messages in real time
socket.on("message", (data) => {
    const messageElement = document.createElement("p");
    messageElement.innerText = `${data.user}: ${data.text}`;
    chatBox.appendChild(messageElement);
});


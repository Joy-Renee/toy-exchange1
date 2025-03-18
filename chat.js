const socket = io("http://127.0.0.1:5000");

const chatBox = document.createElement("div");
chatBox.className = "chat-box";
document.body.appendChild(chatBox);

const messageInput = document.createElement("input");
messageInput.type = "text";
messageInput.placeholder = "Type a message...";
document.body.appendChild(messageInput);

const sendButton = document.createElement("button");
sendButton.innerText = "Send";
document.body.appendChild(sendButton);

// Get stored room name
const room = localStorage.getItem("chatRoom") || "default_room";

socket.emit("join", { user: "User1", room: room });

sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message) {
        socket.emit("message", { user: "User1", message: message, room: room });
        messageInput.value = "";
    }
});

socket.on("message", (data) => {
    const messageElement = document.createElement("p");
    messageElement.innerText = `${data.user}: ${data.text}`;
    chatBox.appendChild(messageElement);
});

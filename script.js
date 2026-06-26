const socket = io();

const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const username = prompt("¿Cómo te llamas?") || "Invitado";

let canSend = true;
const cooldown = 2000; // 2 segundos

function sendMessage() {

    if (!canSend) return;

    const text = input.value.trim();

    if (text === "") return;

    socket.emit("chat message", {
        user: username,
        text: text
    });

    input.value = "";

    canSend = false;
    button.disabled = true;
    button.textContent = "Espera...";

    setTimeout(() => {
        canSend = true;
        button.disabled = false;
        button.textContent = "Enviar";
    }, cooldown);
}

button.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

socket.on("chat message", (data) => {

    const div = document.createElement("div");

    div.className =
        data.user === username
            ? "message me"
            : "message other";

    div.innerHTML = `
        <span class="name">${data.user}</span>
        ${data.text}
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});
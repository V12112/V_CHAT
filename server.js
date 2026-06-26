const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    console.log("Usuario conectado");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });

});

server.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});
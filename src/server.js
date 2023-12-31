import express from "express"
import http from "http"
import WebSocket, { WebSocketServer } from 'ws';
import path from 'path';
const __dirname = path.resolve();

const app = express()


app.set("view engine", "pug");
app.set("views", __dirname+ "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get('*', (req,res) => res.redirect('/'))
const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app)
const wss = new WebSocketServer({server})

const sockets = []
wss.on("connection", (socket) => {
    sockets.push(socket)
    socket["nickname"] = "Anon"
    console.log('Connected to Browser')
    socket.on("close", () => {
        console.log("DisConnected From The Browser")
    })
    socket.on("message", (msg) => {
        const message = JSON.parse(msg)

        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload.toString()}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }

        // socket.send(message.toString())
    });
});

server.listen(3000)


// app.listen(3000, handleListen);
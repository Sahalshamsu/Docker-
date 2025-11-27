    const express = require("express")
    const http = require("http")
    const {Server} = require("socket.io")
    const cors = require("cors")
    const chatSocket = require('./sockets/ChatPage')

    const app = express()
    app.use(cors())
    app.use(express.json())

    const server = http.createServer(app)

    const io = new Server(server,{
        cors:{
            origin:'https://localhost:5173',
            methods:["GET", "POST"]
        }
    })

    chatSocket(io)

    app.get('/', (req,res)=>{
        res.send("Chat server running")
    })

    server.listen(5000, ()=>{
        console.log('server running on port 5000')
    })
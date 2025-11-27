module.exports= (io) => {
    io.on("connection", (socket)=>{
        console.log("User Connected", socket.id)

        socket.on("joinRoom", (roomName) => {
            if(typeof roomName === "string" && roomName.trim()) {
                socket.join(roomName)
                console.log(`user ${socket.id} joined Room ${roomName}`)
            }
        })

        socket.on("sendMessage", ({ room,sender,message} = {})=>{
            if(!room || !message) return
            io.to(room).emit("receiveMessage", {sender,message,timestamp: Date.now()})
        })

        socket.on("disconnect", ()=>{
            console.log("User Disconnected:", socket.id)
        })
    })
}
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './ChatPage.css'

const socket = io("http://localhost:5000", {
    transports: ['websocket'],
})

export default function ChatPage() {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [joined, setJoined] = useState(false)

    useEffect(() => {
        const handler = (msg) => {
            setChat((prev) => [...prev, msg])
        }

        socket.on("receiveMessage", handler)

        return () => socket.off("receiveMessage", handler)
    }, [])

    const joinroom = () => {
        if (username && room) {
            socket.emit("joinRoom", room)
            setJoined(true)
        }
    }

    const sendmessage = () => {
        if (!message.trim()) return

        socket.emit("sendMessage", {
            room,
            sender: username,
            message,
        })
        setMessage("")
    }

   return (
    <div className="chat-container">
        {!joined ? (
            <div className="join-box">
                <h2>Join Chat Room</h2>

                <input
                    className="input-field"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="input-field"
                    placeholder="Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />

                <button onClick={joinroom}>Join</button>
            </div>
        ) : (
            <div>
                <h2>Room: {room}</h2>

                <div className="chat-box">
                    {chat.map((m, i) => (
                        <div key={i} className="chat-message">
                            <strong>
                                {m.sender !== username ? m.sender + ": " : ""}
                            </strong>
                            {m.message}
                        </div>
                    ))}
                </div>

                <input
                    className="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                />

                <button className="send-btn" onClick={sendmessage}>Send</button>
            </div>
        )}
    </div>
)
}
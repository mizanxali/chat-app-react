import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket
const ENDPOINT = 'localhost:5000'

const Chat = (props) => {

    const data = queryString.parse(props.location.search)
    console.log(data);

    const [name, setName] = useState(data.name)
    const [room, setRoom] = useState(data.room)

    useEffect(() => {
        // establish a connection instance with the server
        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io.connect(ENDPOINT, connectionOptions)
        console.log(socket)

        //emit events
        socket.emit('join', {name: name, room: room}, () => {} )

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('disconnect')
            //shut down connnection instance
            socket.off()
        }
    }, [])

    return (
        <h1>Chat</h1>
    )
}

export default Chat

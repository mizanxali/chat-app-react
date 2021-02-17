import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'

let socket
const ENDPOINT = 'https://chat-app-react-5270.herokuapp.com/'

const Chat = (props) => {

    const data = queryString.parse(props.location.search)

    const [name, setName] = useState(data.name)
    const [room, setRoom] = useState(data.room)
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // establish a connection instance with the server
        var connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io.connect(ENDPOINT, connectionOptions)
        console.log(socket);

        //emit events
        socket.emit('join', {name: name, room: room}, () => {} )

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('disconnect')
            //shut down connnection instance
            socket.off()
        }
    }, [])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          })

        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })
    }, [])

    //function for sending messages
    const sendMessage= (event) => {
        event.preventDefault()
        if(message) {
            socket.emit('sendMessage', { message: message }, () => {
                setMessage('')
            })
        }
    }

    console.log(message, messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar roomName={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat

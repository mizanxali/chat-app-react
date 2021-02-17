const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')
const cors = require('cors')
const path = require('path')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

io.on('connection', (socket) => {

    socket.on('join', (payload, callback) => {
        const { error, newUser} = addUser({
            id: socket.id,
            name: payload.name,
            room: payload.room
        })

        if(error)
            return callback(error)

        socket.emit('message', {user: 'admin', text: `welcome ${newUser.name} to ${newUser.room}`})
        socket.broadcast.to(newUser.room).emit('message', {user: 'admin', text: `${newUser.name} has joined ${newUser.room}`})
        socket.join(newUser.room)

        io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})

        callback()
    })

    socket.on('sendMessage', (payload, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: payload.message})
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined ${user.room}`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        }
    })
})

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
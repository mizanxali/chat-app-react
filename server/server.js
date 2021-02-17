const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('a user has connected')

    socket.on('join', (payload, callback) => {
        console.log(`${payload.name} has joined ${payload.room}`)
    })

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })
})

app.use(router)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
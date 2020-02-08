const express = require('express')
const server = express()

server.get('/', (req, res) => {
	res.send('Hello world!')
})
server.listen(8080)


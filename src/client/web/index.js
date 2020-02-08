const express = require('express')
const path = require('path')

const DIRECTORY_NAME = __dirname
const HTML_FILE = path.join(DIRECTORY_NAME, 'index.html')

const server = express()
server.use(express.static(DIRECTORY_NAME))
server.get('*', (req, res) => {
	res.sendFile(HTML_FILE)
})
server.listen(process.env.PORT)

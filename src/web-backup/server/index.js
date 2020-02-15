import express from 'express'
import { createRenderer } from 'vue-server-renderer'

import createApp from '../src/app.js'

const renderer = createRenderer()
const server = express()
server.get('*', (req, res) => {
	const app = createApp()
	renderer.renderToString(app, (err, html) => {
		if (err) {
			console.error(err)
			res.status(500).end('Internal server error')
			return
		}
		res.end(html)
	})
})
server.listen(process.env.PORT)

import Vue from 'vue'
import express from 'express'
import { createRenderer } from 'vue-server-renderer'

const server = express()
server.get('*', (req, res) => {
	const app = new Vue({
		data: { url: req.url },
		template: `<div>The URL is: {{ url }}</div>`,
	})

	createRenderer().renderToString(app, (err, html) => {
		if (err) {
			res.status(500).end('Internal server error')
			return
		}
		res.end(`
			<!DOCTYPE html>
			<html lang="en">
			<head><title>Hello</title></head>
			<body>${html}</body>
			</html>
		`)
	})
})
server.listen(process.env.PORT)

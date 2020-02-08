const htmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: { server: './server.js' },
	externals: [ nodeExternals() ],
	module: {
		rules: [
			{
				// Transpile ES6-8 to ES5
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
			{
				// Load the javascript into the HTML template using entry point
				test: /\.html$/,
				use: [{ loader: 'html-loader' }],
			},
		],
	},
	node: {
		// ! Use default node implementation, not webpack implementation
		__dirname: false,
		__filename: false,
	},
	plugins: [
		new htmlWebpackPlugin({
			excludeChunks: [ 'server' ],
			filename: './index.html',
			template: './index.html',
		})
	],
	target: 'node',
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
	},
}

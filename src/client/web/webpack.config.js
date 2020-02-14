'use strict'

const path = require('path')
const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
	devServer: {
		compress: true,
		contentBase: OUTPUT_PATH,
		host: '0.0.0.0',
		hot: true,
		inline: true,
		open: true,
		port: 8080,
		watchOptions: { ignored: /node_modules/, poll: true },
	},
	entry: {
		main: './src/main.js',
		server: './src/server/index.js',
	},
	module: {
		rules: [
			{
				// Load the javascript into the HTML template using entry point
				test: /\.html$/,
				use: [{ loader: 'html-loader' }],
			},
			{
				// Transpile ES6-8 to ES5
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
			{
				test: /\.vue$/,
				use: { loader: 'vue-loader' },
			},
		],
	},
	node: {
		// ! Use default node implementation, not webpack implementation
		__dirname: false,
		__filename: false,
	},
	plugins: [
		new HtmlWebPackPlugin({
			excludeChunks: [ 'server' ],
			filename: './index.html',
			template: './src/index.html',
		}),
		new VueLoaderPlugin(),
	],
	target: 'node',
	output: {
		filename: '[name].js',
		path: OUTPUT_PATH,
		publicPath: '/',
	},
}

const HtmlWebPackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
	devServer: {
		contentBase: OUTPUT_PATH,
		host: '0.0.0.0',
		hot: true,
		inline: true,
		port: 8080,
		watchOptions: { poll: true },
	},
	entry: {
		main: './src/js/index.js',
		server: './src/server/index.js',
	},
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
		new HtmlWebPackPlugin({
			excludeChunks: [ 'server' ],
			filename: './index.html',
			template: './src/html/index.html',
		})
	],
	target: 'node',
	output: {
		filename: '[name].js',
		path: OUTPUT_PATH,
		publicPath: '/',
	},
}

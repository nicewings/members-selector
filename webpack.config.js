const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './example/src/app.js'),
	output: {
		path: path.join(__dirname, 'example/dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: [/node_modules/, /dist/],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }, //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader', // creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'less-loader', // compiles Less to CSS
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './example/src/index.html'),
			filename: './index.html',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		port: 3001,
	},
};

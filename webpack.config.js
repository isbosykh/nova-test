const path = require('path');
const webpack = require('webpack');

/*
* SplitChunksPlugin is enabled by default and replaced
* deprecated CommonsChunkPlugin. It automatically identifies modules which
* should be splitted of chunk by heuristics using module duplication count and
* module category (i. e. node_modules). And splits the chunks…
*
* It is safe to remove "splitChunks" from the generated configuration
* and was added as an educational example.
*
* https://webpack.js.org/plugins/split-chunks-plugin/
*
*/

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
* We've enabled HtmlWebpackPlugin for you! This generates a html
* page for you when you compile webpack, which will make you start
* developing and prototyping faster.
*
* https://github.com/jantimon/html-webpack-plugin
*
*/

module.exports = {
	mode: 'production',
	entry: './src/app.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs')
	},

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],
					minimize: true,

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'assets/'
					}
				}]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: ['img:src', 'link:href'],
						outputPath: 'assets/',
						publicPath: 'assets/'
					}
				}
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
		})
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};

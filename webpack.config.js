/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var webpack = require('webpack');
const path = require('path');

var PROD = process.argv.indexOf('-p') !== -1
var PROD1 = false

module.exports = {
	'context': __dirname,
	entry: {
		'Main': 'src/FeatureTest',
	},
	output: {
		 path: path.resolve(__dirname, ""),
		filename: './build/[name].js',
		chunkFilename: './build/[id].js',
		sourceMapFilename : '[file].map',
	},
	resolve: {
		//root: __dirname,
		modules : [__dirname, 'node_modules', 'src', 'third_party', 'node_modules/tone', 'style'],
	},
	plugins: PROD1 ? [
	    new webpack.optimize.UglifyJsPlugin({minimize: true})
	  ] : [],
	 module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|Tone\.js)/,
				use: [
			        {
			            loader: 'babel-loader',
			            query: {
			                presets: ['es2015']
			            }
			        }
			    ]
				/*use: 'babel', // 'babel-loader' is also a valid name to reference
				query: {
					presets: ['es2015']
				}*/
			},
			{
				test: /\.css$/,
				//use: 'style!css!autoprefixer!sass'
				use: ['style-loader', 'css-loader','sass-loader'],
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(png|gif|svg)$/,
				use: 'url-loader',
			},
			{
				test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				use : 'file-loader?name=images/font/[hash].[ext]'
			}
		]
	},
	devtool: PROD ? '' : '#eval-source-map'
};
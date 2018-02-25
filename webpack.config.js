const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	entry: "./src/javascripts/main.js",
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js',
    },
	module: {
		rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: { presets: ['es2015']  }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader", options: { sourceMap: true, outputStyle: 'compressed', importsLoader: 1} },
                        { loader: "sass-loader", options: { sourceMap: true, outputStyle: 'compressed'}},
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                config: {
                                    path: './postcss.config.js'
                                }
                            }
                        },
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test:    /\.html$/,
                exclude: /node_modules/,
                loader:  'file-loader?name=[name].[ext]',
            }
		]
	},
    plugins: [
    		new UglifyJSPlugin({sourceMap: true}),
            new ExtractTextPlugin({filename: "style.css"})
    ],
    devServer: {
        inline: true,
        stats: { colors: true },
        port: 3000
    },
    devtool: 'source-map'
};
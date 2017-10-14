const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const root = path.resolve(__dirname);

module.exports = {
    entry: [
        'core-js/fn/promise',
        'whatwg-fetch',
        path.resolve(root, 'app/index.ts')
    ],
    output: {
        path: path.resolve(root, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: [".js", ".ts", ".d.ts", ".tsx", ".css", ".json"]
    },
    module: {
        rules: [
            {
                include: [
                    path.resolve(root, "app")
                ],
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.jpg$/,
                use: ['file-loader?name=./images/[hash].[ext]']
            },
            {
                test: /\.json$/,
                use: 'file-loader?name=./api/[hash].[ext]'
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'file-loader?name=./fonts/[hash].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader?name=./fonts/[hash].[ext]'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

        ],
    },
    devServer: {
        open: true,
        port: 8989,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(root, 'app/views/index/index.ejs')
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),
        new ExtractTextPlugin('styles.css'),
    ]
};

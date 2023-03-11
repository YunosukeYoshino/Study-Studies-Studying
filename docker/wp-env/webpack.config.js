const path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "production",
    entry: {
        'main': [
            "./src/js/main.js",
            './src/scss/style.scss'
        ]
    },
    output: {
        path: path.join(__dirname, "theme/assets/"),
        filename: "js/main.js",
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader',]
            },
        ],
    },

    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,//Localのポート番号
            proxy: {
                target: "http://localhost:10011",
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/images'),
                to: path.resolve(__dirname, 'theme/assets/images'),
            }]
        }),

    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};

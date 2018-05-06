const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: resolve(__dirname),
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React select search',
            template: resolve(__dirname, './template.html'),
        }),
    ],
};

const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/js/bootstrap.jsx',
    devtool: 'source-map',
    output: {
        filename: 'js/app.bundle.js',
        chunkFilename: 'js/chunks/[name].bundle.js',
        path: resolve(__dirname, './public'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'node_modules',
        ],
        alias: {
            mjs: resolve(__dirname, 'src/js'),
        },
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
            },
            {
                test: /\.jsx$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React select search',
            hash: true,
            template: resolve(__dirname, './src/index.ejs'),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'css/app.css' : 'css/app.[hash].css',
        }),
        new CopyPlugin([
            { from: 'src/static', to: '' },
        ]),
    ],
};

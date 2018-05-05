const { resolve } = require('path');

module.exports = {
    entry: './src',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
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
        ],
    },
    externals: ['react', 'fuse.js'],
};

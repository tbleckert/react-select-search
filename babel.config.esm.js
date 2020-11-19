module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                loose: true,
                targets: {
                    browsers: ['>1%, not dead, not ie 11'],
                },
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        ['@babel/proposal-class-properties', { loose: true }],
        ['@babel/proposal-object-rest-spread', { loose: true }],
        ['transform-react-remove-prop-types', {
            mode: 'wrap',
            ignoreFilenames: ['node_modules'],
        }],
    ],
};

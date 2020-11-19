module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'cjs',
                loose: true,
                shippedProposals: true,
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

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
        ['@babel/preset-react', {
            runtime: 'automatic',
        }],
    ],
    plugins: [
        ['@babel/proposal-class-properties', { loose: true }],
        ['@babel/proposal-object-rest-spread', { loose: true }],
        ['@babel/transform-react-pure-annotations', { loose: true }],
        ['transform-react-remove-prop-types', {
            mode: 'wrap',
            ignoreFilenames: ['node_modules'],
        }],
    ],
};

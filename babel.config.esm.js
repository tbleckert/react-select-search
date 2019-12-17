module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: ['>2%, not dead'],
                },
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
    ],
};

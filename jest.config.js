module.exports = {
    collectCoverageFrom: ['src/**/{!(types.js|index.js),}.{js,jsx}'],
    testMatch: ['<rootDir>/__tests__/*.test.{js,jsx}'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};

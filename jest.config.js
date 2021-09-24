module.exports = {
    collectCoverageFrom: ['src/**/{!(types.js|index.js),}.{js,jsx}'],
    testMatch: ['<rootDir>/__tests__/*.test.{js,jsx}'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },

};

if (process.env.REACT_16 === 'true') {
    module.exports.moduleNameMapper = {
        ...module.exports.moduleNameMapper,
        '^react-dom((\\/.*)?)$': 'react-dom-16$1',
        '^react((\\/.*)?)$': 'react-16$1',
    };
}

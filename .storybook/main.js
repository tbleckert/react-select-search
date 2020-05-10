module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-storysource'],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};

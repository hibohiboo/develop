module.exports = {
  webpackFinal: async (config) => {
    config.devServer = { watchOptions: { aggregateTimeout: 300, poll: 1000 } };
    return config;
  },
};
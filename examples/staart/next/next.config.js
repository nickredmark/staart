const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  publicRuntimeConfig: {
    url: process.env.URL,
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  },
  serverRuntimeConfig: {
    url: process.env.SERVER_SIDE_URL || process.env.URL,
  },
  webpack(config, { dev }) {
    // remove Uglify plugin
    config.plugins = config.plugins.filter((plugin) => {
      return plugin.constructor.name !== 'UglifyJsPlugin';
    });

    if (!dev) {
      // add Babili plugin
      config.plugins.push(new BabiliPlugin());
    }

    return config;
  },
};

const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'node'];
config.resolver.extraNodeModules = {
  events: require.resolve('events'),
};

module.exports = config;
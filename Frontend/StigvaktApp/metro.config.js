const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure the watchFolders doesn't include backend paths
config.watchFolders = [__dirname];

// Make sure projectRoot is correctly set
config.projectRoot = __dirname;

module.exports = config;

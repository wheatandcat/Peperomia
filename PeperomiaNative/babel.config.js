module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ['inline-dotenv'],
    presets: ['babel-preset-expo'],
  };
};

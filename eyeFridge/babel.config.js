module.exports = function(api) {
  api.cache(true);
  // babel.config.js
module.exports = {
  plugins: ["nativewind/babel"],
};
  return {
    presets: ['babel-preset-expo'],
    
  };
};

module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: ['./src/components'],
            containers: ['./src/containers'],
            lib: ['./src/lib'],
            img: ['./src/img'],
            hooks: ['./src/hooks'],
            domain: ['./src/domain'],
            config: ['./src/config'],
          },
        },
      ],
      'inline-dotenv',
    ],
    presets: ['babel-preset-expo'],
  };
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            containers: './src/containers',
            lib: './src/lib',
            img: './src/img',
            hooks: './src/hooks',
            domain: './src/domain',
            config: './src/config',
            queries: './src/queries',
            storyBookUtils: './src/storyBookUtils',
            __mockData__: './src/__mockData__',
          },
        },
      ],
      'inline-dotenv',
    ],
  };
};

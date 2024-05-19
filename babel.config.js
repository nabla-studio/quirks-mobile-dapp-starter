module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { lazyImports: true }],
      "@quirks/react-native/babel",
    ],
    plugins: [
      [
				'module-resolver',
        {
          alias: {
            '@/assets': './assets',
          }
        }
      ]
    ]
  };
};

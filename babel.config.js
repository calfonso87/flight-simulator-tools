module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@domain": "./src/domain",
            "@infra": "./src/infrastructure",
            "@app": "./src/application",
            "@ui": "./src/presentation",
            "@assets": "./assets",
          },
        },
      ],
      "nativewind/babel",
      "react-native-reanimated/plugin", // Must be last
    ],
  };
};

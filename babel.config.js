module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"], // NativeWind belongs here
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
      // REMOVED: "nativewind/babel" (It was duplicated here)
      "react-native-reanimated/plugin", // Kept at the absolute end
    ],
  };
};

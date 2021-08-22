module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: [">0.2%", "not dead", "not op_mini all"],
        useBuiltIns: false,
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
        version: "^7.8.3",
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-classes",
    [
      "@babel/plugin-proposal-optional-chaining",
      {
        loose: true,
      },
    ],
  ],
};

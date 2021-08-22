const deps = require("./package.json").dependencies;

module.exports = {
  name: "app2",
  exposes: {
    "./Button": "./src/Button",
    "./App": "./src/Routes",
  },
  filename: "remoteEntry.js",
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};

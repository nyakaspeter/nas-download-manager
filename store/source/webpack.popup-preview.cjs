const path = require("path");
const makeExtensionConfig = require("../../webpack.config.js");

const base = makeExtensionConfig({}, { mode: "production" });
const rules = base.module.rules.map((rule) => {
  if (String(rule.test) !== String(/\.tsx?$/)) {
    return rule;
  }

  return {
    ...rule,
    use: {
      ...rule.use,
      options: {
        ...rule.use.options,
        configFile: path.resolve(__dirname, "tsconfig.popup-preview.json"),
      },
    },
  };
});

module.exports = {
  ...base,
  entry: {
    "popup-preview": "./store/source/popup-preview.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../../artifacts/store-preview"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    ...base.module,
    rules,
  },
};

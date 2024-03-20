// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./public/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

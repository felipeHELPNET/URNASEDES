// webpack.config.js
import path from "path";

module.exports = {
  entry: "./public/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

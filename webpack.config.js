const path = require('path');

const SRC_DIR = path.join(__dirname, 'client/src/components');
const DIST_DIR = path.join(__dirname, 'client/dist');

module.exports = {
  entry: [`${SRC_DIR}/index.jsx`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
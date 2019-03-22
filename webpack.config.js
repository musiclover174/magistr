const path = require('path');

module.exports = {
  mode: 'production',
  entry: './dev/js/building/script.js',
  output: {
    path: path.resolve(__dirname, './dev/js/'),
    filename: 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};